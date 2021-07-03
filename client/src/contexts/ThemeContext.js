import React, { createContext } from 'react';
import useToggle from '../helpers/SwitchHelper';

const ThemeContext = createContext();

function ThemeProvider (props){
	const isDarkSaved = JSON.parse(localStorage.getItem(
		'isDarkTheme'
	))
	console.log(isDarkSaved);
	const [ isDarkTheme, toggleTheme ] = useToggle(
		isDarkSaved ? true : false
	);

	return (
		<ThemeContext.Provider
			value={{ isDarkTheme, toggleTheme }}
		>
			{props.children}
		</ThemeContext.Provider>
	);
}

export { ThemeProvider, ThemeContext };
