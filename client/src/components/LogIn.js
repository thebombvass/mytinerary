import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Container, Button } from 'reactstrap';
import { connect } from 'react-redux'
import { CSSTransition, } from 'react-transition-group';

//components
import NavBar from './NavBar.js'
import PostResource from './PostResource.js';

//action imports
import { setNewEmail, setNewPassword, setNewProfPicUrl, setEmail, setPassword, } from '../store/actions/cityActions';

class LogIn extends Component {

    state = {
        showEmailSignIn: false,
        showCreateAccount: false,
      };

    async updateEmail(e) {
        this.props.dispatch(setEmail(e.target.value))
    }
    
    async updatePassword(e) {
        this.props.dispatch(setPassword(e.target.value))
    }

    async updateNewEmail(e) {
        this.props.dispatch(setNewEmail(e.target.value))
      }
    
      async updateNewPassword(e) {
        this.props.dispatch(setNewPassword(e.target.value))
      }

      async updateNewProfPicUrl(e) {
        this.props.dispatch(setNewProfPicUrl(e.target.value))
      }

    getGoogleConsent() {
        window.location.href = "http://localhost:5000/api/users/google"
    }

    componentToggle(num) {
        //back button
        if (num === 0) {
            if (this.state.showEmailSignIn===true) {
                this.setState(prevState => ({
                    showEmailSignIn: !prevState.showEmailSignIn
                }));
            } else if (this.state.showCreateAccount===true) {
                this.setState(prevState => ({
                    showCreateAccount: !prevState.showCreateAccount
                }));
            }
        //google log in
        } else if (num ===1) {
            this.getGoogleConsent()
        //log in with email
        } else if (num ===2) {
            this.setState(prevState => ({
                showEmailSignIn: !prevState.showEmailSignIn
            }));
        //create new account
        } else if (num ===3) {
            this.setState(prevState => ({
                showCreateAccount: !prevState.showCreateAccount
            }));
        }
    }

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <Container className="logInHeader">
                    <img src="https://img.icons8.com/android/24/000000/user.png" alt="account icon"></img>
                    <h2>Log In</h2>
                </Container>
                {/* buttons for different login options */}
                <Container id="signInButtonsContainer">
                <Button id ="signInWithGoogle"
                onClick={()=> {
                    this.componentToggle(1)
                }}
                >
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google icon"></img>
                    Log in with Google
                </Button>
                <Button id="signInWithEmail"
                onClick={()=> {
                    this.componentToggle(2)
                }}
                >
                    <img src="https://img.icons8.com/color/24/000000/secured-letter.png" alt="email icon"></img>
                    Log in with email
                </Button>
                <Button id="createAccountWithEmail"
                onClick={()=> {
                    this.componentToggle(3)
                }}
                >
                    <img src="https://img.icons8.com/android/24/000000/add-user-male.png" alt="new acount icon"></img>
                    Create new account with email
                </Button>

                {/* transition to email log in*/}
                <CSSTransition
                in={this.state.showEmailSignIn}
                timeout={400}
                classNames="emailLog-transition"
                unmountOnExit
                appear
                >
                    <div className="logInWithEmailForm">
                    <Button
                    className="logInBackButton"
                    onClick={()=> {
                        this.componentToggle(0)
                    }}
                    >
                        <img src="https://img.icons8.com/android/24/000000/back.png" alt="back arrow icon"></img>
                        Back
                    </Button>
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
                        <div className="logInSubmitButtonContainer">
                        <PostResource
                            url="http://localhost:5000/api/users/login"
                            parentComp = "logIn"
                            >
                        </PostResource>
                        </div>
                    </Form>
                    </div>
                </CSSTransition>

                {/* transition to create account */}
                <CSSTransition
                in={this.state.showCreateAccount}
                timeout={400}
                classNames="newAcct-transition"
                unmountOnExit
                appear
                >
                <div className="createNewAccountForm">
                    <Button
                    className="logInBackButton"
                    onClick={()=> {
                        this.componentToggle(0)
                    }}
                    >
                        <img src="https://img.icons8.com/android/24/000000/back.png" alt="back arrow icon"></img>
                        Back
                    </Button>
                    
                    <Container>
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
                        <div className="logInSubmitButtonContainer">
                            <PostResource
                                url="http://localhost:5000/api/users/create"
                                parentComp = "createAccount"
                                >
                            </PostResource>    
                        </div>

                    </Form>
                    </Container>
                </div>
                </CSSTransition>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.cities.email,
        password: state.cities.password,
        newEmail: state.cities.newEmail,
        newPassword: state.cities.newPassword,
        newProfPicUrl: state.cities.newProfPicUrl,
    }
  }

export default connect(mapStateToProps)(LogIn)
