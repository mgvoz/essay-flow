import {
	FETCH_ALL_FILES,
	ADD_FILE,
	UPDATE_FILE,
	DELETE_FILE,
} from '../constants/actionTypes';

const reducers = (files = [], action) => {
	switch (action.type) {
		case FETCH_ALL_FILES:
			return action.payload;
		case ADD_FILE:
			return [action.payload];
		case UPDATE_FILE:
			return files.map((file) =>
				file._id === action.payload._id ? action.payload : file,
			);
		case DELETE_FILE:
			return files.filter((file) => file._id !== action.payload);
		default:
			return files;
	}
};

export default reducers;
