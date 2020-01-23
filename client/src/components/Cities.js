import React, { Component } from 'react';
import { Container, Collapse, Button, CardBody, Card} from 'reactstrap';
import { connect } from 'react-redux'

//components
import PostResource from './PostResource';
import ItineraryCover from './ItineraryCover';
import NavBar from './NavBar'

//action imports
import { filterCities, setNewCity, setNewCountry, setNewUrl } from '../store/actions/cityActions';

class Cities extends Component {

  state = {
    search: "",
    isToggleOn: false,
  }
  
  // async componentDidMount() {
  //   console.log("")
  // } 

  async updateSearch(e) {
    await this.setState({search: e.target.value});
    const searchResults = this.props.cities.filter( (city) =>{
      return city.name.indexOf(this.state.search) !== -1;
    })
    this.props.dispatch(filterCities(searchResults))
  }

  async updateNewCity(e) {
    let newArrary = []
    //TO DO: fix this somehow - Tolo and Toledo clash. Should only be at the end of the word. Diff ONblahblah?
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

  toggleAddCityForm() {
    // this.setState(state => ({
    //   isToggleOn: !state.isToggleOn
    // }));

    this.setState({
      isToggleOn: !this.state.isToggleOn
    })
  }

  render() {

    return (
      <div>
      <NavBar></NavBar>
      {/* you need to add an 'if logged in can add cities, if not then nuh uh' */}

      <Container>
        <div className="citiesHeader">
        <img src="https://img.icons8.com/ios/50/000000/city-buildings.png"></img>
        <h1>Cities</h1>
        </div>

        <div className="citiesForms">
          <div className="searchCities">
            <img src="https://img.icons8.com/material-sharp/24/000000/search.png"></img>
            <input id="searchBar" type="text" value ={this.state.search} onChange={this.updateSearch.bind(this)}></input>
          </div>

          { this.props.currentUsername.length>0 ? (
          <Button id="addClassButton" className="button" onClick={this.toggleAddCityForm.bind(this)}>Add City</Button>) 
          : (<br></br>) 
          }
        </div>
          <Collapse isOpen={this.state.isToggleOn}>
            <Card>
              <CardBody>
                <label htmlFor="addCity"> Add City: </label>
                <input id="addCity" type="text" value ={this.props.newCity} onChange={this.updateNewCity.bind(this)}></input>
                <br></br> <label htmlFor="addCountry"> Country: </label>
                <input id="addCountry" type="text" value ={this.props.newCountry} onChange={this.updateNewCountry.bind(this)}></input>
                <br></br><label htmlFor="addImage"> Image URL: </label>
                <input id="addImage" type="text" value ={this.props.newUrl} onChange={this.updateNewUrl.bind(this)}></input>
                <br></br>
                
                <PostResource 
                  url="http://localhost:5000/api/cities"
                  parentComp = "cities"
                  >  
                </PostResource>
              </CardBody>
            </Card>
          </Collapse>
          <br></br>
              
          {this.props.loading ? <p>loading...</p> : 
            this.props.filteredResults.map(({ id, name, country, imageUrl, itinerariesUrl, activNum, itinNumber}) => (
                <a href={itinerariesUrl}>
                <ItineraryCover key={id}
                imageUrl = {imageUrl}
                styleInfo={"CitiesList"}
                cityName={name + ", " + country}
                activCounter= {activNum}
                itinCounter = {itinNumber}
                ></ItineraryCover>
                </a>
            ))}
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
    currentUsername: state.cities.currentUsername,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     filterSearch: searchResults => dispatch(filterCities(searchResults))
//   }
// }


export default connect(mapStateToProps)(Cities)