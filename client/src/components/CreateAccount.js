import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button, Container } from 'reactstrap';
import { connect } from 'react-redux'
//components
import NavBar from './NavBar.js'

class CreateAccount extends Component {

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <Container>
                    <h2>Create Account</h2>
                    <p>Fill out the form below to create an account.</p>
                </Container>
                <Container>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="i.e. example@example.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="" />
                        <FormText color="muted">
                            Passwords must be no less than 8 characters.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="profpic">Profile Picture</Label>
                        <Input type="text" name="profpic" id="profpic" placeholder="please add it as a url" />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup> */}
                    <Button>Submit</Button>
                </Form>
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
