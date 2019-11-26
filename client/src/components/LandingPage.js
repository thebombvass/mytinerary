import React from 'react';
import MYtineraryLogo from '../assets/MYtineraryLogo.png'
import '../assets/LandingPage.css';

import StartBrowsing from './StartBrowsing'
import Footer from './Footer'


function LandingPage() {
    return (
      <div className="App">
          <img src={MYtineraryLogo} className="Mytinerary-logo" alt="logo" />
          <p className="TagLine">Find your perfect trip, designed by insiders who know and love their cities.</p>
          <StartBrowsing />
          <Footer />
      </div>
    );
  }
  
  export default LandingPage;