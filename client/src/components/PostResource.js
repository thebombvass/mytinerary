import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';

export default class PostResrouce extends Component {

    async makePost(url, dataObject) {
        console.log('here')
        if(Object.keys(dataObject).includes('name')) {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            let newArray = []
            for(let i=0; i<data.length; i++) {
                newArray.push(data[i].name)
            }
            console.log(newArray)
            if(!newArray.includes(dataObject.name)) {
                fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataObject)
                }).then(res => res.json())
                .then(data => console.log(data), alert('City created!'))
                .catch(err => console.log(err));
            } else {
                alert('Sorry, this resource was already created')
            }
        }
   }

   testFunction(url, dataObject) {
        console.log("URL: " + url);
        console.log("data object");
        console.log(dataObject);
   }

    render(){
        return (
            <Button 
            color="dark" 
            style={{marginBottom: '2rem'}}
            onClick={()=> {
                const url = this.props.url;
                const dataObject = this.props.dataObject;
                this.makePost(url, dataObject)
                // this.testFunction(url,dataObject)
            }}
            >Submit</Button>

        )
    }
}
