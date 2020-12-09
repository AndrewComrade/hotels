import {FILTER_HOTELS} from "../constants/types";

export const filterHotels = (filterData) => ({
	type: FILTER_HOTELS,
	payload: filterData
})
