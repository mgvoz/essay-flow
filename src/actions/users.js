import * as api from '../api';

//action creators

export const getUsers = () => async (dispatch) => {
	try {
		const { data } = await api.fetchUsers();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createUser = (user) => async (dispatch) => {
	try {
		const { data } = await api.createUser(user);
		dispatch({ type: 'CREATE', payload: data });
	} catch (error) {
		console.log(error.response);
	}
};
//CHANGE THIS TO UPDATE USER
export const createRubric = (id, user) => async (dispatch) => {
	try {
		const { data } = await api.createRubric(id, user);
		dispatch({ type: 'CREATE_RUBRIC', payload: data });
	} catch (error) {
		console.log(error.response);
	}
};
