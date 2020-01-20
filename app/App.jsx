import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Loader from './Loader';
import TopBar from './TopBar';
import * as Utils from './Utils';
import { initialDate } from './Constants';
import 'react-datepicker/dist/react-datepicker.css';
import siteSettings from '../site-settings.json';

const objectPath = require('object-path');
require('es6-promise').polyfill();

class App extends React.Component {
  constructor(props) {
    super(props);
    const activeProfile = window.PROFILES.find(profile => profile.active);

    this.state = {
      loading: true,
      period: {
        from: initialDate().from,
        to: initialDate().to,
      },
      profile: activeProfile,
      profiles: window.PROFILES,
      results: [],
      tests: window.TESTS,
    };

    this.baseUrl = window.BASE_URL || '';
  }

  componentDidMount() {
    const { period: { from, to } } = this.state;
    document.title = siteSettings.title;

    this.fetchData(from, to);
  }

  componentDidUpdate(oldProps, oldState) {
    const { period: { from, to }, profile } = this.state;
    if ((oldState.period.from !== from)
      || (oldState.period.to !== to) || (oldState.profile !== profile)) {
      this.fetchData(from, to);
    }
  }

  fetchData = (dateFrom, dateTo) => {
    const { tests } = this.state;
    const monthFrom = (dateFrom.getFullYear() * 100) + dateFrom.getMonth() + 1;
    const monthTo = (dateTo.getFullYear() * 100) + dateTo.getMonth() + 1;

    const testsForRange = tests.filter(test => (
      (test >= monthFrom) && (test <= monthTo)
    ));

    const queue = testsForRange.map((test) => {
      const { profile } = this.state;
      const year = test.toString().slice(0, 4);
      const month = test.toString().slice(4, 6);

      const path = `${this.baseUrl}/results/${profile.slug}/${year}/${month}.json`;
      return window.fetch(path).then(response => (
        response.json()
      ));
    });

    this.setState({
      loading: true,
    });
    const results = [];
    let length = 0;
    let objLength = 0;
    Promise.all(queue).then((resultChunks) => {
      resultChunks.forEach(({ _r: r }) => {
        Utils.traverseObject(r, (obj, path) => {
          objLength = obj.length; // Should find the largest length
          obj.forEach((item, index) => {
            objectPath.set(results, `${length + index}.${path.join('.')}`, item);
          });
        });
        length += objLength;
      });
      this.setState({
        loading: false,
        results,
      });
    });
  }

  changePeriod = (newPeriod) => {
    this.setState({
      period: newPeriod,
    });
  }

  changeProfile = (newProfile) => {
    this.setState({
      loading: true,
    });

    window.history.pushState(null, null, `${this.baseUrl}/${newProfile}`);
    window.fetch(`${this.baseUrl}/profiles.json`)
      .then(res => res.json())
      .then((profiles) => {
        const profile = profiles.find(profileObj => profileObj.slug === newProfile);

        this.setState({
          loading: false,
          profile,
          tests: profile.tests,
        });
      });
  }

  render() {
    const {
      state,
    } = this;
    const { loading } = state;
    return (
      <div style={Utils.hexToRgb(siteSettings.colors)}>
        {loading
          && <Loader loading={loading} />}
        <div className="c-App">
          <TopBar {...state} />
          <Dashboard
            {...state}
            onPeriodChange={this.changePeriod}
            onProfileChange={this.changeProfile}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
