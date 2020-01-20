import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Loader from './Loader';
import CreateForm from './Forms/CreateForm';
import * as Utils from './Utils';
import siteSettings from '../site-settings.json';
import store from './store/store';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  setLoading = (loading) => {
    this.setState({
      loading,
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div style={Utils.hexToRgb(siteSettings.colors)}>
        {loading
          && <Loader loading={loading} />}
        <div />
        <div className="c-Create">
          <header className="c-Create__title">Create Profile</header>
          <CreateForm setLoading={this.setLoading} />
        </div>
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <CreatePage />
  </Provider>,
  document.getElementById('root'),
);
