import React from 'react';
import PropTypes from 'prop-types';

import {FormControl, Input, InputLabel} from "@material-ui/core";

export const Reviews = ({value, onChange}) => {
	const onReviewsChange = (event) => {
		onChange(parseInt(event.target.value))
	}

	return (
		<FormControl variant="outlined">
			<InputLabel>Кол-во отзывов (от):</InputLabel>
			<Input variant="outlined" value={value} onChange={onReviewsChange} placeholder="Например, от 10" inputProps={{type: "number", step: "1", min: "0"}}/>
		</FormControl>
	);
};

Reviews.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	onChange: PropTypes.func.isRequired
}
