
const initState = {
    cities: [],
    status: "",
    loading: true,
    filteredResults: [],
    newCity: "",
    newCountry: "",
    newUrl: "",
    newEmail: "",
    newPassword: "",
    newProfPicUrl: "",
}

function citiesReducer(state = initState, action) {
    console.log(action, state)
    switch(action.type) {
        case 'FETCH_CITIES_REQUEST':
            return {
                ...state,
                cities: action.response,
                status: action.status,
                loading: false,
                filteredResults: action.response,
            }
        case 'FETCH_CITIES_ERROR':
            return {
                ...state,
                status: action.status,
                loading: false,
            }
        case 'FILTER_CITIES' : 
            return {
                ...state,
                filteredResults: action.filteredResults
            }
        case 'SET_NEW_CITY' : 
            return {
                ...state,
                newCity: action.newCity
            }
        case 'SET_NEW_COUNTRY' : 
            return {
                ...state,
                newCountry: action.newCountry
            }
        case 'SET_NEW_URL' : 
            return {
                ...state,
                newUrl: action.newUrl
            }
        case 'CLEAR_NEW_CITY_FIELDS' : 
            return {
                ...state,
                newCity: "",
                newCountry: "",
                newUrl: "", 
            }
        case 'SET_NEW_EMAIL' :
            return {
                ...state, 
                newEmail: action.newEmail
            }
        case 'SET_NEW_PASSWORD' :
            return {
                ...state, 
                newPassword: action.newPassword
            }
        case 'SET_NEW_PROFPICURL' :
            return {
                ...state, 
                newProfPicUrl: action.newProfPicUrl
            }
        case 'CLEAR_NEW_USER_FIELDS' : 
            return {
                ...state,
                newEmail: "",
                newPassword: "",
                newProfPicUrl: "", 
            }
        default: 
            return state;
    }
}

export default citiesReducer;