import { FETCH_ALL_FILES } from '../constants/actionTypes';

const reducers = (files = [], action) => {
	switch (action.type) {
		case FETCH_ALL_FILES:
			return action.payload;
		default:
			return files;
	}
};

export default reducers;
