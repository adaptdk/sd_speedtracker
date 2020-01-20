import React from 'react';
import PropTypes from 'prop-types';

const checkboxField = ({
  input,
  label,
  meta: { touched, error },
}) => (
  <label className="field field--checkbox" htmlFor={label}>
    <input
      id={label}
      {...input}
      className="field__input"
      type="checkbox"
    />
    <span className="field__label">{label}</span>
    {touched && error && <span className="field__error">{error}</span>}
  </label>
);

checkboxField.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};


export default checkboxField;
