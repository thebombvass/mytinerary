import React from 'react';
import '../assets/LandingPage.css';
import CircledRight from '../assets/CircledRight.png'

function StartBrowsing() {
  return (
    <div className="StartBrowsing">
        <h2>Start Browsing</h2>
        <img src={CircledRight} className="StartBrowsingButton" alt="start browsing" />
    </div>
  );
}

export default StartBrowsing;