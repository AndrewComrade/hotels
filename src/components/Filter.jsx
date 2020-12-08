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

const initFilterState = () => ({
	country: "",
	types: [],
	stars: {},
});

export const Filter = () => {
	const dispatch = useDispatch()
	const hotels = useSelector(({hotelsReducer}) => hotelsReducer.hotels)

	const [filterData, setFilterData] = React.useState(initFilterState());

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
		//тут мы всегда закидываем value
		setFilterData({...filterData, stars})
	}

	const onApplyFilter = () => {
		//берем только ключи и только те ключи у которых значение тру и переводим их в число
		const stars = Object.keys(filterData.stars)
			.filter(key => filterData.stars[key])
			.map(item => parseInt(item));
		dispatch(filterHotels({...filterData, stars}))
	}

	const onResetFilter = () => {
		setFilterData(initFilterState());
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
				<Country countries={countries} onChange={setCountry} value={filterData.country}/>
			</FilterElement>

			<FilterElement>
				<Type types={types} getTypes={setType}/>
			</FilterElement>

			<FilterElement>
				{/*value = либо stars либо пустой массив если не задан*/}
				<Stars stars={stars} onChange={setStars} value={filterData.stars} />
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
