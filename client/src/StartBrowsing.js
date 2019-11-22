import React from 'react';
import './LandingPage.css';
import CircledRight from './CircledRight.png'

function StartBrowsing() {
  return (
    <div className="StartBrowsing">
        <h2>Start Browsing</h2>
        <img src={CircledRight} className="StartBrowsingButton" alt="start browsing" />
    </div>
  );
}

export default StartBrowsing;