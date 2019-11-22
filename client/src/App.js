import React, { Component } from 'react';
import LandingPage from './LandingPage.js'
import Cities from './Cities.js'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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
