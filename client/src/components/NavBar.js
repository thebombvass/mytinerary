import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu  } from 'reactstrap';


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
  
    render() {
        const citiesUrl = window.location.protocol + "//"+window.location.hostname+":"+window.location.port+'/cities'
        const homeUrl = window.location.protocol + "//"+window.location.hostname+":"+window.location.port+'/'
        const createAccountUrl = window.location.protocol + "//"+window.location.hostname+":"+window.location.port+'/createaccount'

        return (
            <Container>
            <Row>
                <Col xs="3">
                    <Nav>
                        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown.bind(this)}>
                        <DropdownToggle nav caret>
                            Account
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Log In</DropdownItem>
                            <DropdownItem><a href={createAccountUrl}>Create an Account</a></DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </Col>

                <Col>
                </Col>

                <Col xs="3">
                <Navbar color="faded" light>
                    <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav>
                        <NavItem>
                            <NavLink href={citiesUrl}>Cities</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={homeUrl}>Home</NavLink>
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

export default NavBar;
