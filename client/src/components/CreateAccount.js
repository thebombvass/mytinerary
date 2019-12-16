import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button, Container } from 'reactstrap';
import { connect } from 'react-redux'

//components
import NavBar from './NavBar.js'
import PostResource from './PostResource.js';

//action imports
import { setNewEmail, setNewPassword, setNewProfPicUrl, } from '../store/actions/cityActions';

class CreateAccount extends Component {

    async updateNewEmail(e) {
        this.props.dispatch(setNewEmail(e.target.value))
      }
    
      async updateNewPassword(e) {
        //maybe something like 'if e.target.value.lenght > 8' then that else nothing?
        this.props.dispatch(setNewPassword(e.target.value))
      }

      async updateNewProfPicUrl(e) {
        this.props.dispatch(setNewProfPicUrl(e.target.value))
      }

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
                        <Input type="email" name="email" id="email" placeholder="i.e. example@example.com" value ={this.props.newEmail} onChange={this.updateNewEmail.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="" value ={this.props.newPassword} onChange={this.updateNewPassword.bind(this)} />
                        <FormText color="muted">
                            Passwords must be no less than 8 characters.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="profpic">Profile Picture</Label>
                        <Input type="text" name="profpic" id="profpic" placeholder="please add it as a url" value ={this.props.newProfPicUrl} onChange={this.updateNewProfPicUrl.bind(this)} />
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
                        url="http://localhost:5000/api/users"
                        parentComp = "createAccount"
                        >
                    </PostResource>
                </Form>
                </Container>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        newEmail: state.cities.newEmail,
        newPassword: state.cities.newPassword,
        newProfPicUrl: state.cities.newProfPicUrl,
    }
  }

export default connect(mapStateToProps)(CreateAccount)
