import React, { Component } from 'react';
// import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux'
import '../assets/ItineraryCover.css'


class ItineraryCover extends Component {

    render() {
        let divStyle = {
            backgroundImage: 'url('+this.props.imageUrl+')',
        }

        let coverName;

        if (this.props.styleInfo === "OneCityMultiItin") {
            coverName = this.props.cityName.length > 15 ? this.props.cityName.slice(0,15) + "..." : this.props.cityName
        } else {
            coverName = this.props.cityName
        }

        return(
            <div className={this.props.styleInfo}> 
                <div className="itineraryPhoto" style={divStyle}>
                </div>
                <div className="itineraryCoverDescription">
                    <p>{coverName}</p>
                    {this.props.activCounter ? <div>
                        <img src="https://img.icons8.com/ios/50/000000/starred-ticket.png" alt="activity icon"></img>
                        {this.props.activCounter}
                        <img src="https://img.icons8.com/ios/50/000000/wish-list.png" alt="itinerar icon"></img>
                        {this.props.itinCounter}
                    </div> : <div>
                        <p>0 likes</p> 
                        <img className="heart" src="https://img.icons8.com/ios/50/000000/hearts.png" alt="heart"></img></div>}
                </div>
            </div>
        )
    }

}

//mapStateToProps

//tbh this might not need redux at all now that I think ab it

export default connect()(ItineraryCover)
