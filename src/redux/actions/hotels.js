import {SET_HOTELS} from "../constants/types";
import axios from "axios";

export const fetchHotels = () => dispatch => {
	axios.get('hotels.json').then(({data: {hotels}}) => {
		dispatch(setHotels(hotels))
	})
}

export const setHotels = (hotels) => ({
	type: SET_HOTELS,
	payload: hotels,
})
