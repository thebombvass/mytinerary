//react imports
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//component imports
import LandingPage from './LandingPage.js';
import Cities from './Cities.js';
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
         
        </div>
      </BrowserRouter>
  );
  }
}
