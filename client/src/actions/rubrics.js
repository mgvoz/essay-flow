import * as api from '../api';
import {
	FETCH_ALL,
	CREATE_RUBRIC,
	UPDATE_RUBRIC,
	DELETE_RUBRIC,
} from '../constants/actionTypes';

export const getRubrics = () => async (dispatch) => {
	try {
		const { data } = await api.getRubrics();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createRubric = (rubric) => async (dispatch) => {
	try {
		const { data } = await api.createRubric(rubric);
		dispatch({ type: CREATE_RUBRIC, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateRubric = (id, rubric) => async (dispatch) => {
	try {
		const { data } = await api.updateRubric(id, rubric);
		dispatch({ type: UPDATE_RUBRIC, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteRubric = (id) => async (dispatch) => {
	try {
		await api.deleteRubric(id);
		dispatch({ type: DELETE_RUBRIC, payload: id });
	} catch (error) {
		console.log(error);
	}
};
