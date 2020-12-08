import {FILTER_HOTELS, SET_HOTELS} from "../constants/types";

const initialState = {
	hotels: [],
	isLoaded: false,
}

export const hotelsReducer = (state = initialState, action) => {
	if (action.type === SET_HOTELS) {
		return {
			...state,
			hotels: action.payload,
			isLoaded: true
		}
	}

	if (action.type === FILTER_HOTELS) {
		if (!action.payload) {
			return state.hotels
		}

		let {country, types, stars} = action.payload
		let newState = Object.assign({}, state)

		if (country || types || stars) {
			newState.filteredHotels = state.hotels
				.filter(hotel => hotel.country === country)
				.filter(hotel => types.includes(hotel.type))
				.filter(hotel => stars.includes(hotel.stars))
		} else {
			newState = state.hotels
		}
		return newState
	}
	return state
}
