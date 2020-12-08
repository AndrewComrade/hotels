import React from 'react';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from "@material-ui/core";

export const Stars = ({stars, onChange, value}) => {
	const handleChange = (e) => {
		const {name, checked} = e.target;
		//передаем старое значение с новым
		onChange({...value, [name]: checked});
	};


	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Количество звёзд</FormLabel>
			<FormGroup>
				{stars && stars.map((item, index) => (
					<FormControlLabel
						key={index}
						//checked={value[item]} так у нас если поля нет то оно будет undef а значит false
						control={<Checkbox checked={!!value[item]} onChange={handleChange} name={item.toString()}/>}
						label={item}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
};
