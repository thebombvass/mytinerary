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
            <div className={this.props.styleInfo} style={divStyle}>
                <p>{this.props.cityName}</p>
            </div>
        )
    }

}

//mapStateToProps

//tbh this might not need redux at all now that I think ab it

export default connect()(ItineraryCover)
