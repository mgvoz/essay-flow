import * as api from '../api';
import {
	FETCH_ALL_FILEDATA,
	CREATE_FILEDATA,
	UPDATE_FILEDATA,
	DELETE_FILEDATA,
} from '../constants/actionTypes';

export const getFileData = () => async (dispatch) => {
	try {
		const { data } = await api.getFileData();
		dispatch({ type: FETCH_ALL_FILEDATA, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createFileData = (rubric) => async (dispatch) => {
	try {
		const { data } = await api.createFileData(rubric);
		dispatch({ type: CREATE_FILEDATA, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updateFileData = (id, rubric) => async (dispatch) => {
	try {
		const { data } = await api.updateFileData(id, rubric);
		dispatch({ type: UPDATE_FILEDATA, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteFileData = (id) => async (dispatch) => {
	try {
		await api.deleteFileData(id);
		dispatch({ type: DELETE_FILEDATA, payload: id });
	} catch (error) {
		console.log(error);
	}
};
