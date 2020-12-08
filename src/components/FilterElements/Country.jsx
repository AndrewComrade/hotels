import React from 'react';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

export const Country = ({countries, onChange, value}) => {

	const onCountryChange = (e) => {
		onChange(e.target.innerText)
	}

	return (
		<Autocomplete
			onChange={onCountryChange}
			value={value}
			renderInput={(params) => <TextField label="Страна" variant="outlined" {...params} />}
			options={countries}
		>
		</Autocomplete>
	);
};
