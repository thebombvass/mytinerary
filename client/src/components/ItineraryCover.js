import React, { Component } from 'react';
// import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux'
import '../assets/ItineraryCover.css'


class ItineraryCover extends Component {

    render() {
        let divStyle = {
            backgroundImage: 'url('+this.props.imageUrl+')',
        }
        return(
            <div className={this.props.styleInfo}> 
                <div className="itineraryPhoto" style={divStyle}>
                </div>
                <div className="itineraryCoverDescription">
                    <p>{this.props.cityName}</p>
                    <div>
                        <img src="https://img.icons8.com/ios/50/000000/two-tickets.png" alt="activity icon"></img>
                        {this.props.activCounter}
                        <img src="https://img.icons8.com/ios/50/000000/wish-list.png" alt="itinerar icon"></img>
                        {this.props.itinCounter}
                    </div>
                </div>
            </div>
        )
    }

}

//mapStateToProps

//tbh this might not need redux at all now that I think ab it

export default connect()(ItineraryCover)
