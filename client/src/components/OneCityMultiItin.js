import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'
//components
import ItineraryCover from './ItineraryCover.js'
import NavBar from './NavBar.js'


class OneCityMultiItin extends Component {

    state = {
        itinerariesData: [],
        loadinghere: true,
        cityImageStyle: {},
      }
      

    async componentDidMount() {
        const thisCityUrl = window.location.pathname.slice(13)
        //To Do: is this used anywhere????
        let cityName = ""
        for (var i=0; i < thisCityUrl.length; i++) {
            if (thisCityUrl.charAt(i) === "%") {
                cityName += " ";
                i += 2;
            } else {
                cityName += thisCityUrl.charAt(i);
            }
        }
        await fetch("http://localhost:5000/api/itineraries/" + window.location.pathname.slice(13))
            .then(async(response)=> {
                this.state.itinerariesData = await response.json()
                console.log(this.state.itinerariesData)
                this.setState({loadinghere: false})
                this.props.cities.forEach((city) => {
                    if(city.name === cityName) {
                        this.setState({cityImageStyle: 
                        {
                            backgroundImage: 'url('+city.imageUrl+')'
                        }
                        })
                    }
                })
            })
            .catch((err)=> {
                console.log(err)
            })
      }    

    render() {
        return(
            <div>
            <NavBar></NavBar>
            <div id="singleCityCover" style={this.state.cityImageStyle}>
            </div>
            
            <Container>
                <h4>Activities:</h4>
                <div horizontal className="horizontalScroll">
                {this.state.loadinghere ? <p>loading...</p> : 
                    this.state.itinerariesData.map(({ id, title, profPicUrl }) => (
                        <div className="horizontalScrollDiv">
                        <ItineraryCover
                        key={id}
                        imageUrl = {profPicUrl}
                        styleInfo={"OneCityMultiItin"}
                        cityName={title}
                        ></ItineraryCover>
                        </div>
                    ))}
                </div>
                <h4>Itineraries:</h4>
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

export default connect(mapStateToProps)(OneCityMultiItin)
