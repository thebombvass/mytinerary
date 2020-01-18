import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu  } from 'reactstrap';
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
            <Container>
            <Row>
                <Col xs="4">
                    { this.props.currentUsername.length>0 ? (
                    <Nav>
                        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown.bind(this)}>
                        <DropdownToggle nav caret>
                            <img className='navProfilePicture' src={this.props.currentProfPicUrl} alt="Profile" ></img> Account
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Welcome {this.props.currentUsername}!</DropdownItem>
                            <DropdownItem><Link to="/createaccount">My Profile (currently routing to create)</Link></DropdownItem>
                            <DropdownItem onClick={this.logOut.bind(this)}>Log Out</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </Nav>
                    ) : (
                    <Nav>
                        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown.bind(this)}>
                        <DropdownToggle nav caret>
                            <img className='navProfilePicture' src={this.props.currentProfPicUrl} alt="Profile"></img> Account
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>You are currently not logged in.</DropdownItem>
                            <DropdownItem><Link to="/login">Log In</Link></DropdownItem>
                            <DropdownItem><Link to="/createaccount">Create an Account</Link></DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </Nav>
                    )}
                </Col>

                <Col>
                </Col>

                <Col xs="3">
                <Navbar color="faded" light>
                    <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav>
                        <NavItem>
                            <NavLink tag={Link} to="/cities">Cities</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                </Col>

            </Row>
            
          </Container>
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
