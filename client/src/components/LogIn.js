import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Container, Button } from 'reactstrap';
import { connect } from 'react-redux'

//components
import NavBar from './NavBar.js'
import PostResource from './PostResource.js';

//action imports
import { setEmail, setPassword, } from '../store/actions/cityActions';

class LogIn extends Component {

    async updateEmail(e) {
        this.props.dispatch(setEmail(e.target.value))
    }
    
    async updatePassword(e) {
        this.props.dispatch(setPassword(e.target.value))
    }

    getGoogleConsent() {
        window.location.href = "http://localhost:5000/api/users/google"
    }

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <Container>
                    <h2>Log In</h2>
                    <p>Log In here:</p>
                </Container>
                <Container>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="i.e. example@example.com" value ={this.props.email} onChange={this.updateEmail.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="" value ={this.props.password} onChange={this.updatePassword.bind(this)} />
                        <FormText color="muted">
                            Passwords must be no less than 8 characters.
                        </FormText>
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup> */}
                    <PostResource
                        url="http://localhost:5000/api/users/login"
                        parentComp = "logIn"
                        >
                    </PostResource>
                </Form>
                <Button
                onClick={()=> {
                    this.getGoogleConsent()
                }}
                >
                    Sign in with Google
                </Button>
                </Container>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        email: state.cities.email,
        password: state.cities.password,
    }
  }

export default connect(mapStateToProps)(LogIn)
