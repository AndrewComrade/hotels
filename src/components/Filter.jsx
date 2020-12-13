import React from 'react';

import styled from "styled-components";

import {Country, Type, Stars, Reviews, Price} from './FilterElements';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {filterHotels, resetFilters} from "../redux/actions/filters";
import {setCurrentPage} from "../redux/actions/hotels";

const FilterBlock = styled.div`
	display:flex;
	flex-direction: column;	
`

const FilterElement = styled.div`
	margin-bottom: 30px;
`

const initFilterState = () => ({
	country: null,
	types: [],
	stars: {},
	reviewsAmount: "",
	priceRange: []
});

const removeDuplicates = (arr, value) => {
	arr = arr.map(item => item[value])
	arr = [...new Set(arr)]
	return arr
}

export const Filter = () => {
	const dispatch = useDispatch()
	const hotels = useSelector(({hotelsReducer}) => hotelsReducer.hotels)

	const [filterData, setFilterData] = React.useState(initFilterState());

	const countries = removeDuplicates(hotels, 'country').sort()
	const types = removeDuplicates(hotels, 'type')
	const stars = removeDuplicates(hotels, 'stars').sort()

	const maxPrice = Math.ceil(Math.max.apply(Math, removeDuplicates(hotels, 'min_price')) / 1000) * 1000

	const setCountry = (country) => {
		setFilterData({...filterData, country})
	}

	const setType = (types) => {
		setFilterData({...filterData, types})
	}

	const setStars = (stars) => {
		setFilterData({...filterData, stars})
	}

	const setReviewAmount = (reviewsAmount) => {
		setFilterData({...filterData, reviewsAmount})
	}

	const setPriceRange = (priceRange) => {
		setFilterData({...filterData, priceRange})
	}

	const onApplyFilter = () => {
		const stars = Object.keys(filterData.stars)
			.filter(key => filterData.stars[key])
			.map(item => parseInt(item));

		dispatch(filterHotels({...filterData, stars}))
		dispatch(setCurrentPage(1))
	}

	const onResetFilter = () => {
		setFilterData(initFilterState());
		dispatch(resetFilters())
	}

	return (
		<FilterBlock>
			<FilterElement>
				<Country countries={countries} onChange={setCountry} value={filterData.country}/>
			</FilterElement>

			<FilterElement>
				<Type types={types} onChange={setType} value={filterData.types}/>
			</FilterElement>

			<FilterElement>
				<Stars stars={stars} onChange={setStars} value={filterData.stars}/>
			</FilterElement>

			<FilterElement>
				<Reviews onChange={setReviewAmount} value={filterData.reviewsAmount}/>
			</FilterElement>

			<FilterElement>
				<Price onChange={setPriceRange} priceRange={filterData.priceRange} maxPrice={maxPrice}/>
			</FilterElement>

			<FilterElement>
				<Button onClick={onApplyFilter} variant="contained">
					Filter
				</Button>
				<Button onClick={onResetFilter} variant="contained">
					Reset filter
				</Button>
			</FilterElement>
		</FilterBlock>
	);
};
