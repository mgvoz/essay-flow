const reducers = (users = [], action) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'CREATE':
			return [...users, action.payload];
		case 'CREATE_RUBRIC':
			return [...users, action.payload];
		default:
			return users;
	}
};

export default reducers;
