import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
//import actions needed below
import { clearNewCityFields, getCities, } from '../store/actions/cityActions';



class PostResource extends Component {    

    async makePost(url, dataObject) {
        console.log('inside post')
        this.props.dispatch(clearNewCityFields())
        //add dispatch to clear other fields 
        console.log('working')
        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        }).then(res => res.json())
        .then(data => console.log(data), alert('Created!'))
        .catch(err => console.log(err))

    this.props.dispatch(getCities())
    //perhaps here add routing home? Idunno

    //also for later - how do you test that someone is signed in or nah on all pages? just keep in mind
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

   //if using this for Cities Post
   citiesDataObjectCreator(url) {
    //i think move city validation logic here?
    const itinUrl = this.setItinUrl();
    const dataObject = {"name": this.props.newCity, "country": this.props.newCountry, "imageUrl": this.props.newUrl, "itinerariesUrl": itinUrl}
    // this.makePost(url, dataObject);
    this.testFunction(url, dataObject)
   }

   //
   createAccountDataObjectCreator(url) {
    const dataObject = {"email": this.props.newEmail, "password": this.props.newPassword, "profPicUrl": this.props.newProfPicUrl}
    // this.makePost(url, dataObject);
    this.testFunction(url, dataObject)
   }


    render(){
        return (
            <Button 
            color="dark" 
            style={{marginBottom: '2rem'}}
            onClick={()=> {
                console.log('click')
                const url = this.props.url;
                if(this.props.parentComp == "cities") {
                    // this.citiesDataObjectCreator(url)
                } else if (this.props.parentComp == "createAccount") {
                    // this.createAccountDataObjectCreator(url)
                }
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
        newEmail: state.cities.newEmail,
        newPassword: state.cities.newPassword,
        newProfPicUrl: state.cities.newProfPicUrl,
    }
  }

export default connect(mapStateToProps)(PostResource)