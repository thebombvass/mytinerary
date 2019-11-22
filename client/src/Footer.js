import React from 'react';
import homeIcon from './homeIcon.png'
import './LandingPage.css';

function Footer() {
  return (
    <div className="Footer">
      <p>Want to build your own MYtinasdferary?</p>
      <div className="linkBox">
          <a href="https://google.com">Log In</a>
          <a href="https://google.com">Create an Account</a>
      </div>
      <img src={homeIcon} className="homeIcon" alt="home icon" />
    </div>
  );
}

export default Footer;