import * as api from '../api';
import {
	FETCH_ALL_FILES,
	ADD_FILE,
	UPDATE_FILE,
	DELETE_FILE,
} from '../constants/actionTypes';

export const getFiles = () => async (dispatch) => {
	try {
		const { data } = await api.getFiles();
		dispatch({ type: FETCH_ALL_FILES, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const addFile = (file) => async (dispatch) => {
	try {
		const { data } = await api.addFile(file);
		dispatch({ type: ADD_FILE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updateFile = (id, file) => async (dispatch) => {
	try {
		const { data } = await api.updateFile(id, file);
		dispatch({ type: UPDATE_FILE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteFile = (id) => async (dispatch) => {
	try {
		await api.deleteFile(id);
		dispatch({ type: DELETE_FILE, payload: id });
	} catch (error) {
		console.log(error);
	}
};
