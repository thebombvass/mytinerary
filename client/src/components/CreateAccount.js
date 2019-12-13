import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'
//components
import NavBar from './NavBar.js'

class CreateAccount extends Component {

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <Container>
                    <p>Create Account</p>
                </Container>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
      cities: state.cities.cities,
    }
  }

export default connect(mapStateToProps)(CreateAccount)
