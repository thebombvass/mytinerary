import React from 'react';
import '../assets/LandingPage.css';
import CircledRight from '../assets/CircledRight.png'

function StartBrowsing() {
  const citiesUrl = window.location.protocol + "//"+window.location.hostname+":"+window.location.port+'/cities'
  return (
    <div className="StartBrowsing">
        <h2>Start Browsing</h2>
        <a href={citiesUrl}><img src={CircledRight} className="StartBrowsingButton" alt="start browsing" /></a>
    </div>
  );
}

export default StartBrowsing;