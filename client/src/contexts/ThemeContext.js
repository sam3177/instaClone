import React, { createContext} from 'react';
import useToggle from '../helpers/SwitchHelper'

const ThemeContext = createContext();

function ThemeProvider (props) {
	let [ isDarkTheme, setIsDarkTheme ] = useToggle(false);
	return (
		<ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export { ThemeProvider, ThemeContext };
