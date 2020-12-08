import {FILTER_HOTELS, RESET_FILTERS} from "../constants/types";

export const filterHotels = (filterData) => ({
	type: FILTER_HOTELS,
	payload: filterData
})

export const resetFilters = () => ({
	type: RESET_FILTERS,
})
