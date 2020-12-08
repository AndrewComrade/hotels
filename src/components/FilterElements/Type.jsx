import React from 'react';
import {makeStyles, Checkbox, ListItemText, MenuItem, Select, FormControl, InputLabel} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	formControl: {
		width: "100%",
	}
}));

export const Type = ({types, getTypes}) => {
	const classes = useStyles();

	const [selected, setSelected] = React.useState([]);

	const handleChange = (event) => {
		setSelected(event.target.value);
	};

	React.useEffect(() => {
		getTypes(selected)
	}, [selected])

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel id="types-label">Тип</InputLabel>
			<Select
				multiple
				label="Тип"
				renderValue={(selected) => selected.join(', ')}
				onChange={handleChange}
				value={selected}
			>
				{types.map((type) => (
					<MenuItem key={type} value={type}>
						<Checkbox checked={selected.indexOf(type) > -1}/>
						<ListItemText primary={type}/>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
