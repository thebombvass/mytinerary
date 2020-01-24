import React, { Component } from 'react';
//id honestly rather have one css sheet, at App level, so can you see if this is necessary/adjust to get rid of it? 
//  same with ItineraryCover.css
import '../assets/LandingPage.css';
import jwt_decode from 'jwt-decode'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { Container, Row, Col,  } from 'reactstrap';

//Components
import NavBar from './NavBar'

//action imports
import { saveLoggedInUser } from '../store/actions/cityActions';


//lol you fucking idiot dont store isLoggedIn in central store 
//   (altho kinda weird it resets? look into that).
//    store it in user collection. (I guess you need fetch calls everywhere tho? hm)

class LandingPage extends Component {

  state = {
    backgroundStyle: {
      backgroundImage: 'url()',
      },
  }

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

    let backgroundImageArray = ['https://images.unsplash.com/photo-1574673520260-3a5209b775fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80', 'https://images.unsplash.com/photo-1562869035-7c0e05adf020?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1566910399550-7117f25645c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80', 'https://images.unsplash.com/photo-1509129336695-afe9e7d11ae5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1431976047936-b672e11eea4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80', 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1470290282174-30ea78123183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80', 'https://images.unsplash.com/photo-1497262693247-aa258f96c4f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=624&q=80', 'https://images.unsplash.com/photo-1506126483163-f4d1558dbf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80', 'https://images.unsplash.com/photo-1415226556993-1404e0c6e727?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=696&q=80','https://images.unsplash.com/photo-1483835185168-baba67ced0c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=691&q=80', 'https://images.unsplash.com/photo-1541623986909-8b450cbab078?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80']
    let randIndex = Math.floor(Math.random()*backgroundImageArray.length)
    let currentBackgroundImage = backgroundImageArray[randIndex]

    this.setState({
      backgroundStyle: {
        backgroundImage: 'url('+currentBackgroundImage+')',
        },
    })
      
    //end of componentDidMount
  }

  render() {

      return (
        <div className="LandingPage" style={this.state.backgroundStyle}>
            <NavBar></NavBar>
            <Container className="centerLandingPage">
              <p className="TagLine">Find your perfect trip, designed by insiders who know and love their cities.</p>
            </Container>
            <Row className="landingPageOptions">
              <Col xs="5">
                <div className="landingPageOption">
                  <img src="https://img.icons8.com/ios/50/000000/city-buildings.png" alt="city icon"></img>
                  <Link to="/cities" className="textFont">Browse<br></br>Cities</Link>
                </div>
              </Col>
              <Col xs="2">
              </Col>
              <Col xs="5">
                <div className="landingPageOption">
                  <Link className="textFont" to="#">Create<br></br>Itinerary</Link>
                  <img src="https://img.icons8.com/ios/50/000000/wish-list.png" alt="itinerary icon"></img>
                </div>
              </Col>
            </Row>
            {/* <StartBrowsing /> */}
            {/* <p className="PopularHeader">Popular MYtineraries:</p>
            <PopularItineraries></PopularItineraries> */}
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