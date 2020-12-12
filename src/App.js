import React from "react";
import {useDispatch, useSelector} from "react-redux";

import styled from "styled-components";
import './app.scss'
import {CircularProgress} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

import {Filter, Hotel} from './components'
import {fetchHotels, setCurrentPage} from "./redux/actions/hotels";

const Container = styled.div`
	margin: 0 auto;
	padding: 0;
	max-width: 1170px;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-column-gap: 50px;
	height: 100vh;
`

const List = styled.ul`
	margin: 0;
	padding: 0;
`

export const App = () => {
	const dispatch = useDispatch()
	const isLoaded = useSelector(({hotelsReducer}) => hotelsReducer.isLoaded)
	const perPage = useSelector(({hotelsReducer}) => hotelsReducer.perPage)
	const currentPage = useSelector(({hotelsReducer}) => hotelsReducer.currentPage)
	const hotels = useSelector(({hotelsReducer}) => hotelsReducer.filteredHotels)
	let count = Math.ceil(hotels.length / perPage)

	React.useEffect(() => {
		dispatch(fetchHotels())
	}, [])

	const onPageChange = (event, value) => {
		dispatch(setCurrentPage(value))
	}

	return (
		<Container>
			{!!isLoaded &&
			<React.Fragment>
				<Filter/>
				<List>{hotels && hotels
					.slice(perPage * (currentPage - 1), perPage * currentPage)
					.map((hotel, index) => (
						<Hotel key={index} {...hotel}/>
					))}
					{hotels.length === 0 && <div>Записей не найдено</div>}
					{hotels.length > 0 &&
						<Pagination onChange={onPageChange} page={currentPage} count={count}/>
					}
				</List>
			</React.Fragment>
			}
			{!isLoaded && <CircularProgress/>}
		</Container>
	);
}
