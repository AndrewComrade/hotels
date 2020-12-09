import {FILTER_HOTELS, SET_HOTELS} from "../constants/types";

const initialState = {
	hotels: [],
	isLoaded: false,
	filteredHotels: null
};

export const hotelsReducer = (state = initialState, action) => {
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

			let {country, types, stars, reviewsAmount, priceRange} = action.payload;
			let filteredHotels = state.hotels;
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
			if (reviewsAmount > 0) {
				filteredHotels = filteredHotels
					.filter(hotel => hotel.reviews_amount >= reviewsAmount)
			}
			if (priceRange && priceRange.length > 0) {
				filteredHotels = filteredHotels
					.filter(hotel => hotel.min_price >= priceRange[0] && hotel.min_price <= priceRange[1])
			}
			return {...state, filteredHotels};
		default:
			return {...state};
	}
};