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
      }
      

    async componentDidMount() {
        const thisCityUrl = window.location.pathname.slice(13)
        //To Do: is this used anywhere????
        var cityName = ""
        for (var i=0; i < thisCityUrl.length; i++) {
            if (thisCityUrl.charAt(i) === "%20") {
                cityName += " ";
            } else {
                cityName += thisCityUrl.charAt(i);
            }
        }
        await fetch("http://localhost:5000/api/itineraries/" + window.location.pathname.slice(13))
            .then(async(response)=> {
                this.state.itinerariesData = await response.json()
                console.log(this.state.itinerariesData)
                this.setState({loadinghere: false})
            })
            .catch((err)=> {
                console.log(err)
            })
      }    

    render() {
        return(
            <div>
            <NavBar></NavBar>
            <Container>
                <ListGroup>
                {this.state.loadinghere ? <p>loading...</p> : 
                <TransitionGroup className="cities-list">
                    {this.state.itinerariesData.map(({ id, title, profPicUrl }) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                        <ItineraryCover
                        imageUrl = {profPicUrl}
                        styleInfo={"OneCityMultiItin"}
                        cityName={title}
                        ></ItineraryCover>
                        </ListGroupItem>
                    </CSSTransition>
                    ))}
                </TransitionGroup>
                }
                </ListGroup>
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
