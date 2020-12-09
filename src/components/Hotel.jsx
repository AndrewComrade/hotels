import React from 'react';

import styled from "styled-components";

import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import {CalendarToday, Place, Check} from '@material-ui/icons';

const HotelBlock = styled.li`
	margin-bottom: 15px;
	padding: 10px 20px;
	display: grid;
	grid-template-columns: 1fr auto;
	column-gap: 20px;
	list-style: none;
	border: 1px solid rgba(34, 60, 80, 0.5);
	border-radius: 20px;
	box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`

const LeftContent = styled.div`
	display:flex;
	flex-direction: column;
`

const RightContent = styled(LeftContent)`
`

const InfoBlock = styled.div`
	display:flex;
	align-items: center;
`

const InfoText = styled.span`
	margin-left: 15px;
	display:flex;
	align-items: center;
`

export const Hotel = ({name, stars, type, reviews_amount, country, description, min_price, currency}) => {
	const [isBooked, setBooked] = React.useState(false)

	return (
		<HotelBlock>
			<LeftContent>
				<h3>{name}</h3>
				<InfoBlock>
					<Rating value={stars} readOnly/>
					<InfoText>{type}</InfoText>
					<InfoText>Кол-во отзывов: {reviews_amount}</InfoText>
					<InfoText>
						<Place fontSize="small"/>
						{country}
					</InfoText>
				</InfoBlock>
				<p>{description}</p>
			</LeftContent>
			<RightContent>
				<p>{Math.ceil(Math.floor(min_price) / 100) * 100} {currency}</p>
				<span>За 1 ночь</span>
				<Button
					onClick={() => setBooked(!isBooked)}
					variant="contained"
					color={isBooked ? "secondary" : "primary"}
					startIcon={isBooked ? <Check/> : <CalendarToday/>}
				>
					Забронировать
				</Button>
			</RightContent>
		</HotelBlock>
	);
};
