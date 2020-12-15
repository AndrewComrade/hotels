import {FILTER_HOTELS, RESET_FILTERS, SET_CURRENT_PAGE, SET_HOTELS} from "../constants/types";

const initialState = {
	hotels: [],
	filteredHotels: [],
	isLoaded: false,
	perPage: 3,
	currentPage: 1
};

export const hotelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_HOTELS:
			return {
				...state,
				hotels: action.payload,
				filteredHotels: action.payload,
				isLoaded: true
			};
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload,
			}
		case RESET_FILTERS:
			return {
				...state,
				filteredHotels: state.hotels
			};
		case FILTER_HOTELS:
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