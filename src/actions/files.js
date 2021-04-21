import * as api from '../api';
import { FETCH_ALL_FILES } from '../constants/actionTypes';

export const getFiles = () => async (dispatch) => {
	try {
		const { data } = await api.getFiles();

		dispatch({ type: FETCH_ALL_FILES, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
