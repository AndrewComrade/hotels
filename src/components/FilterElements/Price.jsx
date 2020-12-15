import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormLabel, makeStyles, Slider} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	formControl: {
		width: "80%",
	}
}));

export const Price = ({onChange, priceRange, maxPrice}) => {
	const classes = useStyles();

	if (!priceRange.length > 0) {
		priceRange = [0, maxPrice]
	}

	const onPriceChange = (event, newValue) => {
		onChange(newValue)
	}

	const marks = [
		{value: priceRange[0], label: priceRange[0] + ' RUB'},
		{value: priceRange[1], label: priceRange[1] + ' RUB'},
	]


	return (
		<FormControl className={classes.formControl}>
			<FormLabel>Цена</FormLabel>
			<Slider
				min={0}
				max={maxPrice}
				step={500}
				value={priceRange}
				onChange={onPriceChange}
				aria-labelledby="range-slider"
				marks={marks}
			/>
		</FormControl>
	);
};

Price.propTypes = {
	onChange: PropTypes.func.isRequired,
	maxPrice: PropTypes.number.isRequired,
	priceRange: PropTypes.arrayOf(PropTypes.number).isRequired
}
