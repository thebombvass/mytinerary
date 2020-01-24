import React, { Component } from 'react';
import { Nav, NavItem, Container } from 'reactstrap';
import { connect } from 'react-redux'

//components
import NavBar from './NavBar.js'

//action imports
import { } from '../store/actions/cityActions';

class MyProfile extends Component {


    render() {
        return(
            <div>
                <NavBar></NavBar>
                <Container>
                    <h2>My Profile</h2>
                    <p>Welcome {this.props.currentUsername} </p>
                </Container>
                <Container>
                    <h4>Info:</h4>
                    <div>
                        Display Name: {this.props.currentUsername} <br></br>
                        Email: {this.props.currentUsername} <br></br>
                        Profile Picture: {this.props.currentProfPicUrl} <br></br>
                    </div>
                </Container>
                <Container>
                    <h4>Favorites:</h4>
                    <Nav tabs>
                        <NavItem active>
                            Activities
                        </NavItem>
                        <NavItem>
                            Itineraries
                        </NavItem>
                    </Nav>
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
