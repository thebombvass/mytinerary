import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Container, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { CSSTransition, } from 'react-transition-group';

//components
import NavBar from './NavBar.js'

//action imports
import { } from '../store/actions/cityActions';

class MyProfile extends Component {

    state = {
        showActivitiesFavorites: true,
        showItinerariesFavorites: false,
      };

    switchFavoriteToggle() {
        this.setState(prevState => ({
            showActivitiesFavorites: !prevState.showActivitiesFavorites
        }));
        this.setState(prevState => ({
            showItinerariesFavorites: !prevState.showItinerariesFavorites
        }));
    }


    render() {
        return(
            <div>
                <NavBar></NavBar>
                <Container>
                    <h2> 
                        <img src="https://img.icons8.com/ios/50/000000/salute.png" alt="profile"></img>
                        Welcome {this.props.currentUsername}!
                    </h2>
                </Container>
                <Container className="infoContainers">
                    <h4>Info</h4>
                    <div id="profileInfoContainer"> 
                        <div id="nameAndEmail">
                            <b>Picture:</b><br></br> 
                            <img src={this.props.currentProfPicUrl} alt="profile" id="profileCompPic"></img>
                        </div>
                        <div>
                            <b>Display Name:</b> {this.props.currentUsername} <br></br>
                            <b>Email:</b> {this.props.currentUsername} <br></br>
                        </div>
                        
                    </div>
                </Container>
                <Container className="infoContainers">
                    <h4>Favorites</h4>
                    <Nav tabs id="favoritesNav">
                        <NavItem 
                        onClick= {()=> {
                            this.switchFavoriteToggle()
                        }}>
                            <NavLink className={this.state.showActivitiesFavorites ? 'current' : 'noncurrent'}>
                            <img src="https://img.icons8.com/ios/50/000000/starred-ticket.png" alt="activity icon"></img>
                                Activities
                            </NavLink>
                        </NavItem>
                        <NavItem 
                        onClick= {()=> {
                            this.switchFavoriteToggle()
                        }}>
                            <NavLink className={this.state.showItinerariesFavorites ? 'current' : 'noncurrent'}>
                                <img src="https://img.icons8.com/ios/50/000000/wish-list.png" alt="itinerar icon"></img>
                                Itineraries
                            </NavLink>
                        </NavItem>
                    </Nav>

                    {/* activities transition */}
                    <CSSTransition
                    in={this.state.showActivitiesFavorites}
                    timeout={400}
                    classNames="showActivities-transition"
                    unmountOnExit
                    appear
                    >
                    <div className="favoritesTab">
                        <Button>+Create Activity</Button><br></br>
                        You have no activities favorited.
                    </div> 
                    </CSSTransition>

                    {/* itineraries transition */}
                    <CSSTransition
                    in={this.state.showItinerariesFavorites}
                    timeout={400}
                    classNames="showItineraries-transition"
                    unmountOnExit
                    appear
                    >
                    <div className="favoritesTab">
                        <Button>+Create Itinerary</Button><br></br>
                        You have no itineraries favorited.
                    </div> 
                    </CSSTransition>

                </Container>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentUsername: state.cities.currentUsername,
        currentProfPicUrl: state.cities.currentProfPicUrl,
    }
  }

export default connect(mapStateToProps)(MyProfile)
