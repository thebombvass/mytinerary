import React from 'react';
import MYtineraryLogo from '../assets/MYtineraryLogo.png'
import '../assets/LandingPage.css';
// import { Container,  } from 'reactstrap';

//Components
import StartBrowsing from './StartBrowsing'
import NavBar from './NavBar'


function LandingPage() {
    return (
      <div className="App">
          <NavBar></NavBar>
          <img src={MYtineraryLogo} className="Mytinerary-logo" alt="logo" />
          <p className="TagLine">Find your perfect trip, designed by insiders who know and love their cities.</p>
          <StartBrowsing />
          <p className="PopularHeader">Popular MYtineraries:</p>
      </div>
    );
  }
  
  export default LandingPage;