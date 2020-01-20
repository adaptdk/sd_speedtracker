import React from 'react';
import PropTypes from 'prop-types';

const selectField = ({
  input,
  label,
  options,
  disabled,
  placeholder,
  meta: { touched, error },
}) => (
  <label className="field field--select" htmlFor={label}>
    <span className="field__label">{label}</span>
    <select
      {...input}
      className="field__input"
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span className="field__error">{error}</span>}
  </label>
);

selectField.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

selectField.defaultProps = {
  disabled: false,
};

export default selectField;
