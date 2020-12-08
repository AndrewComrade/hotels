import {FILTER_HOTELS, SET_HOTELS} from "../constants/types";

const initialState = {
	hotels: [],
	isLoaded: false,
	//лучше сразу все поля явно показать
	filteredHotels: null
};

export const hotelsReducer = (state = initialState, action) => {
	//switch лучше
	switch (action.type) {
		case SET_HOTELS:
			return {
				...state,
				hotels: action.payload,
				isLoaded: true
			};

		case FILTER_HOTELS:
			if (!action.payload) {
				return {...state, filteredHotels: null};
			}

			let {country, types, stars} = action.payload;
			let filteredHotels = state.hotels;
			//отдельные if'ы потому что можгут прийти не все поля
			if (country) {
				filteredHotels = filteredHotels
					.filter(hotel => hotel.country === country);
			}
			if (types && types.length > 0) {
				filteredHotels = filteredHotels
					.filter(hotel => types.includes(hotel.type));
			}
			if (stars && stars.length > 0) {
				filteredHotels = filteredHotels
					.filter(hotel => stars.includes(hotel.stars));
			}

			return {...state, filteredHotels};
		default:
			//лучше всегда возвращать новую копию
			return {...state};
	}
};