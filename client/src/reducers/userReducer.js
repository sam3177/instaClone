const initialState = '';

const reducer = (state, action) => {
	switch (action.type) {
		case 'USER':
			return action.payload;
		case 'CLEAR':
			return '';
		default:
			return state;
	}
};

export { initialState, reducer };
