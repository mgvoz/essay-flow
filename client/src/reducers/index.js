import { combineReducers } from 'redux';
import rubrics from './rubrics';
import auth from './auth';
import files from './files';
import filedata from './filedata';

export default combineReducers({
	rubrics,
	auth,
	files,
	filedata,
});
