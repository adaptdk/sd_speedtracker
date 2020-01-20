import React from 'react';
import PropTypes from 'prop-types';

const inputField = ({
  input,
  label,
  type,
  placeholder,
  autoComplete,
  meta: { touched, error },
}) => (
  <label className="field field--input" htmlFor={label}>
    <span className="field__label">{label}</span>
    <input
      {...input}
      className="field__input"
      placeholder={placeholder}
      autoComplete={autoComplete}
      type={type}
    />
    {touched && error && <span className="field__error">{error}</span>}
  </label>
);

inputField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default inputField;
