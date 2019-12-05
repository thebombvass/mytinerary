import React from 'react';
import MYtineraryLogo from '../assets/MYtineraryLogo.png'
import '../assets/LandingPage.css';

//Components
import StartBrowsing from './StartBrowsing'
import NavBar from './NavBar'
import PopularItineraries from './PopularItineraries'


function LandingPage() {
    return (
      <div className="App">
          <NavBar></NavBar>
          <img src={MYtineraryLogo} className="Mytinerary-logo" alt="logo" />
          <p className="TagLine">Find your perfect trip, designed by insiders who know and love their cities.</p>
          <StartBrowsing />
          <p className="PopularHeader">Popular MYtineraries:</p>
          <PopularItineraries></PopularItineraries>
      </div>
    );
  }
  
  export default LandingPage;