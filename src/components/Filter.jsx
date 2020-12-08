import React from 'react';

import styled from "styled-components";

import {Country, Type, Stars, Reviews, Price} from './FilterElements';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {filterHotels} from "../redux/actions/filters";

const FilterBlock = styled.div`
	display:flex;
	flex-direction: column;	
`

const FilterElement = styled.div`
	margin-bottom: 30px;
`

export const Filter = () => {
	const dispatch = useDispatch()
	const hotels = useSelector(({hotelsReducer}) => hotelsReducer.hotels)

	const [filterData, setFilterData] = React.useState({})

	const removeDuplicates = (arr, value) => {
		arr = arr.map(item => item[value])
		arr = [...new Set(arr)]
		return arr
	}

	const countries = removeDuplicates(hotels, 'country').sort()
	const types = removeDuplicates(hotels, 'type')
	const stars = removeDuplicates(hotels, 'stars').sort()

	const setCountry = (country) => {
		setFilterData({...filterData, country})
	}

	const setType = (types) => {
		setFilterData({...filterData, types})
	}

	const setStars = (stars) => {
		setFilterData({...filterData, stars})
	}

	const onApplyFilter = () => {
		dispatch(filterHotels(filterData))
	}

	const onResetFilter = () => {
		setFilterData({});
		dispatch(filterHotels({}))
	}


	// const [filterState, setFilterState] = React.useState({
	// 	country: '',
	// 	types: [],
	// })

	// const onCountryChange = (e) => {
	// 	setFilterState({...filterState, country: e.target.innerText})
	// }
	//
	// const onTypesChange = (arr) => {
	// 	console.log(arr);
	//
	// 	setFilterState({...filterState, types: arr})
	// }
	
	return (
		<FilterBlock>
			<FilterElement>
				<Country countries={countries} onChange={setCountry} value={filterData.country ?? ""}/>
			</FilterElement>

			<FilterElement>
				<Type types={types} getTypes={setType}/>
			</FilterElement>

			<FilterElement>
				<Stars stars={stars} getStars={setStars} />
			</FilterElement>

			<FilterElement>
				<Reviews/>
			</FilterElement>

			<FilterElement>
				<Price/>
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
