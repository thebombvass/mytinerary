//react imports
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//component imports
import LandingPage from './LandingPage.js';
import Cities from './Cities.js';
import OneCityMultiItin from './OneCityMultiItin.js';
import CreateAccount from './CreateAccount'
import LogIn from './LogIn.js';

//css imports
import '../assets/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';




export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
             <Route exact path='/' component={LandingPage} />
          </Switch>
          <Switch>
             <Route exact path='/cities' component={Cities} />
          </Switch>
          <Switch>
             <Route path='/itineraries' component={OneCityMultiItin} />
          </Switch>
          <Switch>
             <Route path='/createaccount' component={CreateAccount} />
          </Switch>
          <Switch>
             <Route path='/login' component={LogIn} />
          </Switch>
        </div>
      </BrowserRouter>
  );
  }
}
