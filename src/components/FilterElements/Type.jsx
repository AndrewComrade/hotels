import React from 'react';
import {makeStyles, Checkbox, ListItemText, MenuItem, Select, FormControl, InputLabel} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	formControl: {
		width: "100%",
	}
}));

export const Type = ({types, value, onChange}) => {
	const classes = useStyles();

	const handleChange = (event) => {
		onChange(event.target.value)
	};

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel id="types-label">Тип</InputLabel>
			<Select
				multiple
				label="Тип"
				renderValue={(value) => value.join(', ')}
				onChange={handleChange}
				value={value}
			>
				{types.map((type) => (
					<MenuItem key={type} value={type}>
						<Checkbox checked={value.indexOf(type) > -1}/>
						<ListItemText primary={type}/>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
