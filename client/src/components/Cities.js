import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'
import NavBar from './NavBar'


//components
import PostResource from './PostResource';
import ItineraryCover from './ItineraryCover';

//action imports
import { filterCities, setNewCity, setNewCountry, setNewUrl } from '../store/actions/cityActions';

class Cities extends Component {

  state = {
    search: "",
  }
  
  async componentDidMount() {
    console.log(this.props.loading)
    // this.timer = setInterval(()=> console.log('ok'), 5000)
  }

  async updateSearch(e) {
    await this.setState({search: e.target.value});
    const searchResults = this.props.cities.filter( (city) =>{
      return city.name.indexOf(this.state.search) !== -1;
    })
    this.props.dispatch(filterCities(searchResults))
  }

  async updateNewCity(e) {
    let newArrary = []
    for(let i =0; i<this.props.cities.length; i++) {
      newArrary.push(this.props.cities[i].name)
    }
    if(!newArrary.includes(e.target.value)) {
      this.props.dispatch(setNewCity(e.target.value))
    } else {
      console.log('Sorry! This city was already created')
    }
  }

  async updateNewCountry(e) {
    this.props.dispatch(setNewCountry(e.target.value))
  }

  async updateNewUrl(e) {
    this.props.dispatch(setNewUrl(e.target.value))
  }

  render() {
    return (
      <div>
      <NavBar></NavBar>
      
      <Container>

        <h1>Cities</h1>

        <label htmlFor="searchBar"> Add City: </label>
        <input id="searchBar" type="text" value ={this.props.newCity} onChange={this.updateNewCity.bind(this)}></input>
        <br></br> <label htmlFor="searchBar"> Country: </label>
        <input id="searchBar" type="text" value ={this.props.newCountry} onChange={this.updateNewCountry.bind(this)}></input>
        <br></br><label htmlFor="searchBar"> Image URL: </label>
        <input id="searchBar" type="text" value ={this.props.newUrl} onChange={this.updateNewUrl.bind(this)}></input>
        <br></br>
        
        <PostResource 
          url="http://localhost:5000/api/cities" 
          >  
        </PostResource>
        
        <br></br>
        <label htmlFor="searchBar"> Search List: </label>
        <input id="searchBar" type="text" value ={this.state.search} onChange={this.updateSearch.bind(this)}></input>

        <ListGroup>
          {this.props.loading ? <p>loading...</p> : 
          <TransitionGroup className="cities-list">
            {this.props.filteredResults.map(({ id, name, country, imageUrl, itinerariesUrl}) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                <a href={itinerariesUrl}>
                <ItineraryCover
                imageUrl = {imageUrl}
                styleInfo={"CitiesList"}
                cityName={name + ", " + country}
                ></ItineraryCover>
                </a>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
          }
        </ListGroup>
      </Container>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
    status: state.cities.status,
    loading: state.cities.loading,
    filteredResults: state.cities.filteredResults,
    newCity: state.cities.newCity,
    newCountry: state.cities.newCountry,
    newUrl: state.cities.newUrl,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     filterSearch: searchResults => dispatch(filterCities(searchResults))
//   }
// }


export default connect(mapStateToProps)(Cities)