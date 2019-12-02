
export const fetchCitiesAction = {type: 'FETCH_CITIES_REQUEST'}
export const fetchCitiesActionSuccess = {type: 'FETCH_CITIES_REQUEST', response: "something"}
export const fetchCitiesActionFailure = {type: 'FETCH_CITIES_REQUEST', error: "Error message - request for cities failed"}

// export const RECEIVE_CITIES = 'RECEIVE_CITIES'
const RECEIVE_CITIES = 'RECEIVE_CITIES'


function receiveCities(json) {
  return {
    type: RECEIVE_CITIES,
    cities: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
