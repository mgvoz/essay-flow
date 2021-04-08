import {
	FETCH_ALL,
	CREATE_RUBRIC,
	UPDATE_RUBRIC,
	DELETE_RUBRIC,
} from '../constants/actionTypes';

const reducers = (rubrics = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case CREATE_RUBRIC:
			return [...rubrics, action.payload];
		case UPDATE_RUBRIC:
			return rubrics.map((rubric) =>
				rubric._id === action.payload._id ? action.payload : rubric,
			);
		case DELETE_RUBRIC:
			return rubrics.filter((rubric) => rubric._id !== action.payload);
		default:
			return rubrics;
	}
};

export default reducers;
