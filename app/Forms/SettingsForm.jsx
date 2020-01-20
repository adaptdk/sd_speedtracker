import React from 'react';
import PropTypes from 'prop-types';

const SettingsForm = ({
  profile: {
    name,
    parameters: {
      connectivity,
      location,
      url,
      video,
    },
  },
}) => (
  <div className="form form--settings">
    <div className="field">
      <span className="field__label">Name</span>
      <div className="field__input">{name}</div>
    </div>
    <div className="field">
      <span className="field__label">Connectivity</span>
      <div className="field__input">{connectivity}</div>
    </div>
    <div className="field">
      <span className="field__label">Location</span>
      <div className="field__input">{location}</div>
    </div>
    <div className="field">
      <span className="field__label">URL</span>
      <div className="field__input">{url}</div>
    </div>
    <div className="field">
      <span className="field__label">Video</span>
      <div className="field__input">{video.toString()}</div>
    </div>
  </div>
);

SettingsForm.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default SettingsForm;
