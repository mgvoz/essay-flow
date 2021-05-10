import {
	FETCH_ALL_FILEDATA,
	CREATE_FILEDATA,
	UPDATE_FILEDATA,
	DELETE_FILEDATA,
} from '../constants/actionTypes';

const reducers = (filedata = [], action) => {
	switch (action.type) {
		case FETCH_ALL_FILEDATA:
			return action.payload;
		case CREATE_FILEDATA:
			return [...filedata, action.payload];
		case UPDATE_FILEDATA:
			return filedata.map((entry) =>
				entry._id === action.payload._id ? action.payload : entry,
			);
		case DELETE_FILEDATA:
			return filedata.filter((entry) => entry._id !== action.payload);
		default:
			return filedata;
	}
};

export default reducers;
