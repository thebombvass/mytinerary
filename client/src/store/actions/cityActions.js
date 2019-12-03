// export const RECEIVE_CITIES = 'RECEIVE_CITIES'
// const RECEIVE_CITIES = 'RECEIVE_CITIES'


// function receiveCities(json) {
//   return {
//     type: RECEIVE_CITIES,
//     cities: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }


export function getCities() {
    return(dispatch)=> {
        return fetch("http://localhost:5000/api/cities").then(async(response)=> {
            const data = await response.json()
            await dispatch(fetchCitiesAction(data))
        })
        .catch((error)=> {
            dispatch(fetchCitiesErrorAction(error))
        })
    }
  }

export function fetchCitiesAction(data) {
    return {
        type: 'FETCH_CITIES_REQUEST', 
        status: '200 OK', 
        response: data,
    }
}

export function fetchCitiesErrorAction(error) {
    return {
        type: 'FETCH_CITIES_ERROR', 
        status: error, 
        response: "",
    }
}

export function filterCities(filteredResults) {
    return {
        type: 'FILTER_CITIES', 
        filteredResults: filteredResults,
    }
}

export function setNewCity(cityName) {
    return {
        type: 'SET_NEW_CITY', 
        newCity: cityName,
    }
}

export function setNewCountry(countryName) {
    return {
        type: 'SET_NEW_COUNTRY', 
        newCountry: countryName,
    }
}


export function setNewUrl(newUrl) {
    return {
        type: 'SET_NEW_URL', 
        newUrl: newUrl,
    }
}

export function clearNewCityFields() {
    return {
        type: 'CLEAR_NEW_CITY_FIELDS'
    }
}
