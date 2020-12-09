import React from 'react';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from "@material-ui/core";

export const Stars = ({stars, onChange, value}) => {
	const handleChange = (e) => {
		const {name, checked} = e.target;
		onChange({...value, [name]: checked});
	};

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Количество звёзд</FormLabel>
			<FormGroup>
				{stars && stars.map((item, index) => (
					<FormControlLabel
						key={index}
						control={<Checkbox checked={!!value[item]} onChange={handleChange} name={item.toString()}/>}
						label={item}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
};
