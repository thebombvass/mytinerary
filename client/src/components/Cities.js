import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

//components
import PostResource from './PostResource';

export default class Cities extends Component {
  state = {
    loading: true,
    cities: null,
    search: "",
    filteredResults: [],
    newCity: "",
    newCountry: "",
  }
  
  async componentDidMount() {
    const url = "http://localhost:5000/api/cities";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({cities: data});
    this.setState({loading: false});
    this.setState({filteredResults: data})
  }

  async updateSearch(e) {
    await this.setState({search: e.target.value});
    await this.setState({filteredResults: this.state.cities.filter( (city) =>{
      return city.name.indexOf(this.state.search) !== -1;
    })})
  }

  async updateNewCity(e) {
    await this.setState({newCity: e.target.value});
  }

  async updateNewCountry(e) {
    await this.setState({newCountry: e.target.value});
  }

  // sendNewCity(name, country, imageUrl) {

  // }

  render() {
    return (
      <Container>

        <h1>Cities</h1>

        <label htmlFor="searchBar"> Add City: </label>
        <input id="searchBar" type="text" value ={this.state.newCity} onChange={this.updateNewCity.bind(this)}></input>
        <label htmlFor="searchBar"> Add Country: </label>
        <input id="searchBar" type="text" value ={this.state.newCountry} onChange={this.updateNewCountry.bind(this)}></input>

        <PostResource url="http://localhost:5000/api/cities" dataObject={{"name": this.state.newCity, "country": this.state.newCountry}}>  
        </PostResource>

        <label htmlFor="searchBar"> Search List: </label>
        <input id="searchBar" type="text" value ={this.state.search} onChange={this.updateSearch.bind(this)}></input>

        <ListGroup>
          {this.state.loading ? <p>loading...</p> : 
          <TransitionGroup className="cities-list">
            {this.state.filteredResults.map(({ id, name, country }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <p>{name}</p><p>{country}</p>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
          }
        </ListGroup>
      </Container>
    );
  }
}
