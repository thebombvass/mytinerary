import React, { Component } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux'
//components
import ItineraryCover from './ItineraryCover.js'


class PopularItineraries extends Component {

    render() {
        const cityCovers = []
        let newLen = 0;

        if (this.props.cities.length%2 !==0) {
            newLen = this.props.cities.length - 1
        } else {
            newLen = this.props.cities.length
        }
        console.log("newLen "+newLen)
        
        for (let i=0; i<newLen; i+=2) {
            cityCovers.push(
                <div>
                    <Row>
                        <Col>
                            <ItineraryCover
                            imageUrl = {this.props.cities[i].imageUrl}
                            styleInfo={"PopularItineraries"}
                            cityName={this.props.cities[i].name}
                            ></ItineraryCover>
                        </Col>
                        <Col>
                            <ItineraryCover
                            imageUrl = {this.props.cities[i+1].imageUrl}
                            styleInfo={"PopularItineraries"}
                            cityName={this.props.cities[i+1].name}
                            ></ItineraryCover>
                        </Col>
                    </Row>
                </div>
                       
            )
        }

        if (this.props.cities.length%2 !== 0) {
            cityCovers.push(
                <ItineraryCover
                imageUrl = {this.props.cities[newLen].imageUrl}
                styleInfo={"PopularItineraries"}
                cityName={this.props.cities[newLen].name}
                ></ItineraryCover>
            )
        }

        console.log(this.props.cities)
        
        return(
            <Container>
                <Carousel>
                    {cityCovers} 
                </Carousel>
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
      cities: state.cities.cities,
    }
  }

export default connect(mapStateToProps)(PopularItineraries)
