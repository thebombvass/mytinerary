import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
//import actions needed below
import { clearNewCityFields, getCities,clearNewUserFields } from '../store/actions/cityActions';



class PostResource extends Component {    

    async makePost(url, dataObject) {
        console.log('inside post')
        this.props.dispatch(clearNewCityFields())
        this.props.dispatch(clearNewUserFields())
        //clear create account fields??
        console.log('working')
        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        }).then(res => res.json())
        //TO DO: need to only alert created on success
        // also errors arent showing up. 
        // Specifically for creating an account, if your password doesn't meet the recs and it fails it should notify the suer of that
        
        //TO DO: okay also for login you can't say created.. dynamic message? 
        .then(data => {
            if(data.message) {
                alert(data.message)
            }
            console.log(data)
            if(data.token) {
                window.location.replace('http://localhost:3000/#' + data.token)
            }
        })
        .catch(err => console.log(err))

    this.props.dispatch(getCities())
    }

    testFunction(url, dataObject) {
        console.log('test')
        this.props.dispatch(clearNewCityFields())
        this.props.dispatch(clearNewUserFields())
        console.log("URL: " + url);
        console.log("data object");
        console.log(dataObject);
    }

    setItinUrl() {
        var cityUrlName = "" 

        for (var i=0; i < this.props.newCity.length; i++) {
            if (this.props.newCity.charAt(i) === " ") {
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

    //The click event logic will chose which kind of data we are sending using the parent component indication from props
    //    and then come here. This is also where testFunction can be uncommented and used as opposed to makePost
    //   in case you need to test this component and info it is sending without actually sending anything to the db
    //NOTE: IF YOU TEST, REMEMBER TO UNCOMMENT MAKEPOST WHEN DONE FOR ALL FUNCTIONS BELOW

    //if using this for Cities Post
    citiesDataObjectCreator(url) {
        const itinUrl = this.setItinUrl();
        const dataObject = {"name": this.props.newCity, "country": this.props.newCountry, "imageUrl": this.props.newUrl, "itinerariesUrl": itinUrl}
        this.makePost(url, dataObject);
        // this.testFunction(url, dataObject)
    }

    //if using this for Create Account Post 
    createAccountDataObjectCreator(url) {
        //validate that email exists and that password is appropriate length
        if (this.props.newPassword.length>8 && this.props.newEmail.lenght>0) {
            const dataObject = {"email": this.props.newEmail, "password": this.props.newPassword, "profPicUrl": this.props.newProfPicUrl}
            this.makePost(url, dataObject);
        } else {
            alert('Your account was not created. Please ensure you have both password and email fields filled out and that your password is longer than 8 characters.')
        }
        // this.testFunction(url, dataObject)
    }

    logInDataObjectCreator(url) {
        const dataObject = {"email": this.props.email, "password": this.props.password}
        this.makePost(url, dataObject);
        // this.testFunction(url, dataObject)
    }


    render(){
        return (
            <Button 
            color="dark" 
            style={{marginBottom: '2rem'}}
            onClick={()=> {
                console.log('click')
                const url = this.props.url;
                if(this.props.parentComp === "cities") {
                    this.citiesDataObjectCreator(url)
                } else if (this.props.parentComp === "createAccount") {
                    this.createAccountDataObjectCreator(url)
                } else if (this.props.parentComp === "logIn") {
                    this.logInDataObjectCreator(url)
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
        email: state.cities.email,
        password: state.cities.password
    }
  }

export default connect(mapStateToProps)(PostResource)