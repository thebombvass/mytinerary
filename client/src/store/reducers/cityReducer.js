
const initState = {
    isFetching: true,
    cities: [],
    status: "",
    response: "",

}

function citiesReducer(state = initState, action) {
    console.log(state)
    switch(action.type) {
        case 'FETCH_CITIES_REQUEST': 
            return {
                cities: [],
                response: action.response
            }
        default: 
            return state;
    }
}

export default citiesReducer;