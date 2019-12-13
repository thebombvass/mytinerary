import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
//import actions needed below
import { clearNewCityFields, getCities, } from '../store/actions/cityActions';



class PostResource extends Component {    

    async makePost(url, dataObject) {
        console.log('inside post')
        this.props.dispatch(clearNewCityFields())
        console.log('working')
        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        }).then(res => res.json())
        .then(data => console.log(data), alert('City created!'))
        .catch(err => console.log(err))

    this.props.dispatch(getCities())
   }

   testFunction(url, dataObject) {
       console.log('test')
        this.props.dispatch(clearNewCityFields())
        console.log("URL: " + url);
        console.log("data object");
        console.log(dataObject);
   }

    setItinUrl() {
        var cityUrlName = "" 

        for (var i=0; i < this.props.newCity.length; i++) {
            if (this.props.newCity.charAt(i) == " ") {
                cityUrlName += "%20";
            } else {
                cityUrlName += this.props.newCity.charAt(i);
            }
        }
        console.log(cityUrlName)
        var itinUrl = window.location.protocol + "//"+window.location.hostname+":"+window.location.port+ "/itineraries/"+cityUrlName
        console.log(itinUrl)

        return itinUrl;
   }

    render(){
        return (
            <Button 
            color="dark" 
            style={{marginBottom: '2rem'}}
            onClick={()=> {
                console.log('click')
                const url = this.props.url;
                const itinUrl = this.setItinUrl();
                const dataObject = {"name": this.props.newCity, "country": this.props.newCountry, "imageUrl": this.props.newUrl, "itinerariesUrl": itinUrl}
                this.makePost(url, dataObject);
                // this.testFunction(url,dataObject)
            }}
            >Submit</Button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newCity: state.cities.newCity,
        newCountry: state.cities.newCountry,
        newUrl: state.cities.newUrl,
    }
  }

export default connect(mapStateToProps)(PostResource)