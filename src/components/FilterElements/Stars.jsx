import React from 'react';
import {FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from "@material-ui/core";

//todo: добавить value
export const Stars = ({stars, getStars}) => {
	const obj = stars.reduce((a, b) => (a[b] = false, a), {});

	const [state, setState] = React.useState(obj)

	const handleChange = (e) => {
		setState({...state, [e.target.name]: e.target.checked})
	}
	//
	// React.useEffect(() => {
	// 	let checked = []
	// 	for (let key in state) {
	// 		if (state[key] === true) {
	// 			checked.push(+key)
	// 		}
	// 	}
	// 	getStars(checked)
	// }, [state])


	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Количество звёзд</FormLabel>
			<FormGroup>
				{stars && stars.map((item, index) => (
					<FormControlLabel
						key={index}
						control={<Checkbox checked={state[item]} onChange={handleChange} name={item.toString()}/>}
						label={item}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
};
