import React from "react";
import {useDispatch, useSelector} from "react-redux";

import styled from "styled-components";
import './app.scss'
import {CircularProgress} from "@material-ui/core";

import {Filter, Hotel} from './components'
import {fetchHotels} from "./redux/actions/hotels";

const Container = styled.div`
	margin: 0 auto;
	padding: 0;
	max-width: 1170px;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-column-gap: 30px;
	height: 100vh;
`

const List = styled.ul`
	margin: 0;
	padding: 0;
`

export const App = () => {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(fetchHotels())
	}, [])

	const hotels = useSelector(({hotelsReducer}) => hotelsReducer.filteredHotels ? hotelsReducer.filteredHotels : hotelsReducer.hotels)
	//как вариант когда у тебя 2 редюсера. 1 хранит данные, 2 хранит данные фильтра. Внизу это то что они называют мутацией.
	//Получается ты фильтруешь только тогда когда надо. Основные данные лежат отедльно
	// const hotels = useSelector(({hotelsReducer, filterReducer}) => {
	// 	let {hotels} = hotelsReducer;
	// 	const {country, types, stars} = filterReducer;
	// 	if(country) {
	// 		hotels = hotels
	// 			.filter(hotel => hotel.country === country);
	// 	}
	// 	if (types) {
	// 		hotels = hotels
	// 			.filter(hotel => types.includes(hotel.type));
	// 	}
	// 	if (stars) {
	// 		hotels = hotels
	// 			.filter(hotel => stars.includes(hotel.stars));
	// 	}
	// 	return hotels;
	// });
	const isLoaded = useSelector(({hotelsReducer}) => hotelsReducer.isLoaded)

	console.log(hotels);

	return (
		<Container>
			{!!isLoaded &&
			<React.Fragment>
				<Filter/>
				<List>{hotels && hotels.map((hotel, index) => (
					<Hotel key={index} {...hotel}/>
				))}
				</List>
			</React.Fragment>
			}
			{!isLoaded && <CircularProgress/>}
		</Container>
	);
}
