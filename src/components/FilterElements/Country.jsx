import React from 'react';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

export const Country = ({countries, getCountry}) => {

	const onCountryChange = (e) => {
		getCountry(e.target.innerText)
	}

	return (
		<Autocomplete
			onChange={onCountryChange}
			renderInput={(params) => <TextField label="Страна" variant="outlined" {...params} />}
			options={countries}
		>
		</Autocomplete>
	);
};
