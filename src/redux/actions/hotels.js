import {SET_CURRENT_PAGE, SET_HOTELS} from "../constants/types";
import axios from "axios";

export const fetchHotels = () => dispatch => {
	axios.get('https://andrewcomrade.github.io/hotels/hotels.json').then(({data: {hotels}}) => {
		dispatch(setHotels(hotels))
	})
}

export const setHotels = (hotels) => ({
	type: SET_HOTELS,
	payload: hotels,
})

export const setCurrentPage = (currentPAge) => ({
	type: SET_CURRENT_PAGE,
	payload: currentPAge
})
