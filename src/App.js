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
	const {
		isLoaded,
		perPage,
		currentPage,
		filteredHotels
	} = useSelector(({hotelsReducer}) => hotelsReducer)

	let count = Math.ceil(filteredHotels.length / perPage)

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
				<List>{filteredHotels && filteredHotels
					.slice(perPage * (currentPage - 1), perPage * currentPage)
					.map(hotel => (
						<Hotel key={`${hotel.name}`} {...hotel}/>
					))}
					{filteredHotels.length === 0 && <div>Записей не найдено</div>}
					{filteredHotels.length > 0 &&
						<Pagination onChange={onPageChange} page={currentPage} count={count}/>
					}
				</List>
			</React.Fragment>
			}
			{!isLoaded && <CircularProgress/>}
		</Container>
	);
}
