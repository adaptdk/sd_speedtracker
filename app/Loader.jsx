import React from 'react';
import SVG from 'react-inlinesvg';
import Logo from '../uploads/Logo.svg';

const Loader = () => (
  <div className="c-Loader">
    <div className="c-Loader__content">
      <SVG width="80px" src={Logo} />
    </div>
  </div>
);

export default Loader;
