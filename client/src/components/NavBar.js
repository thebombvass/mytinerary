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
        return (
            <Container>
            <Row>
                <Col xs="3">
                    <NavBar>
                        <NavItem>
                            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown.bind(this)}>
                            <DropdownToggle nav caret>
                                Account
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Log In</DropdownItem>
                                <DropdownItem>Something Else</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </NavBar>
                    
                </Col>

                <Col>
                </Col>

                <Col xs="3">
                <Navbar color="faded" light>
                    <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav>
                        <NavItem>
                            <NavLink>Cities</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Home</NavLink>
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
