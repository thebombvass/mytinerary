import React, { Component } from 'react';
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink,} from 'reactstrap';
import '../assets/App.css'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';


//action imports
import { logOut } from '../store/actions/cityActions';


class NavBar extends Component {

    state = {
        collapsed: false,
        dropdownOpen: false,
    }

    toggleNavbar() {
        this.setState({collapsed: !this.state.collapsed})
    }

    toggleDropDown() {
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    logOut() {
        console.log('youre here logging out')
        localStorage.removeItem('token')
        this.props.dispatch(logOut())
    }
  
    render() {

        return (
        <div>
            <Container className="NavBar">
                <Navbar color="faded" light>
                    <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav>
                        { this.props.currentUsername.length>0 ? (
                            <div>
                            <NavItem> 
                                <br></br>
                                <img className='navProfilePicture' src={this.props.currentProfPicUrl} alt="profile"></img>
                                <Link to="/createaccount" className="linkFont"> View Profile</Link>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/" className="linkFont">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/cities" className="linkFont">Cities</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/" className="linkFont">Create Itinerary</NavLink>
                            </NavItem>
                            <NavItem onClick={this.logOut.bind(this)}>
                                <NavLink tag={Link} to="/" className="linkFont">Log Out</NavLink>
                            </NavItem>
                            </div>
                        ) : (
                            <div>
                            <NavItem>
                                <NavLink tag={Link} to="/" className="linkFont">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/cities" className="linkFont">Cities</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/login" className="linkFont">Log In</NavLink>
                            </NavItem>
                            </div>
                        )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
            <div className="logo">
              <h1>MYtinerary</h1>
            </div>
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
  
export default connect(mapStateToProps)(NavBar)
