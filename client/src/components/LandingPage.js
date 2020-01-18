import React, { Component } from 'react';
import MYtineraryLogo from '../assets/MYtineraryLogo.png'
import '../assets/LandingPage.css';
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'


//Components
import StartBrowsing from './StartBrowsing'
import NavBar from './NavBar'
import PopularItineraries from './PopularItineraries'

//action imports
import { saveLoggedInUser } from '../store/actions/cityActions';


//lol you fucking idiot dont store isLoggedIn in central store 
//   (altho kinda weird it resets? look into that).
//    store it in user collection. (I guess you need fetch calls everywhere tho? hm)

class LandingPage extends Component {

  async componentDidMount() {
    //when you first log in, store the token 
    if (window.location.hash.length>0) {
      console.log('first time logging in, youre here')
      //store token in local and log
      localStorage.setItem('token', window.location.hash.slice(1))
      let token = localStorage.getItem('token')
      console.log(token)
      
      //decode token and log
      let decoded = jwt_decode(token)
      console.log(decoded)
      
      //push decoded token info in central store for current user
      let currentProfPicUrl = decoded.avatarPicture
      let currentUsername = decoded.username
      await this.props.dispatch(saveLoggedInUser(currentUsername, currentProfPicUrl))

      //get rid of hash ?
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    
    //if youre returning
    } else if(localStorage.getItem('token')) {

      console.log('yes there is a token, youre returning')
      let token = localStorage.getItem('token')
      console.log(token)
      
      //decode token and log
      let decoded = jwt_decode(token)
      console.log(decoded)
      
      //push decoded token info in central store for current user
      let currentProfPicUrl = decoded.avatarPicture
      let currentUsername = decoded.username
      await this.props.dispatch(saveLoggedInUser(currentUsername, currentProfPicUrl))

    } else {
      console.log('No token, youre not logged in')
    }
  } 

  render() {

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
}

const mapStateToProps = (state) => {
  return {
      currentUsername: state.cities.currentUsername,
      currentProfPicUrl: state.cities.currentProfPicUrl,
  }
}

export default connect(mapStateToProps)(LandingPage)