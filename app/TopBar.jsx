import React from 'react';
import SVG from 'react-inlinesvg';
import Logo from '../uploads/Logo.svg';

const TopBar = () => (
  <div className="c-TopBar">
    <div className="c-TopBar__inner">
      <SVG width="70px" src={Logo} />
      <div className="logo-text">
        <span>SPEED</span>
        <span>MONITOR</span>
      </div>
    </div>
  </div>
);

export default TopBar;
