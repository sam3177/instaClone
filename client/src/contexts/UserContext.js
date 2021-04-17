import React, { useReducer, createContext} from 'react';

import{reducer, initialState} from '../reducers/userReducer'

const UserContext = createContext();

function UserProvider (props) {
	let [ state, dispatch ] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserProvider, UserContext };
