import React from 'react';
import PropTypes from 'prop-types';

import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

export const Country = ({countries, onChange, value}) => {

	const onCountryChange = (event, value) => {
		onChange(value)
	}

	return (
		<Autocomplete
			value={value}
			onAbort={onCountryChange}
			onChange={onCountryChange}
			renderInput={(params) => <TextField label="Страна" variant="outlined" {...params} />}
			options={countries}
		>
		</Autocomplete>
	);
};

Country.propTypes = {
	countries: PropTypes.arrayOf(PropTypes.string).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
}
