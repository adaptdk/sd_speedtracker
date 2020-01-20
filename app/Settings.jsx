import React from 'react';
import { render } from 'react-dom';
import * as Utils from './Utils';
import siteSettings from '../site-settings.json';
import SettingsForm from './Forms/SettingsForm';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: Utils.getProfile(window.location.search),
    };
  }

  render() {
    const { profile } = this.state;

    return (
      <div style={Utils.hexToRgb(siteSettings.colors)}>
        <div className="c-Settings">
          {profile
            ? (
              <div className="c-Settings__wrapper">
                <header className="c-Settings__title">Profile Settings</header>
                <SettingsForm profile={profile} />
              </div>
            )
            : <div className="c-Settings__error">Profile not found</div>}
        </div>
      </div>
    );
  }
}

render(
  <Settings />,
  document.getElementById('root'),
);
