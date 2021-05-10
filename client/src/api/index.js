import axios from 'axios';

const API = axios.create({ baseURL: 'https://essay-flow.xyz' });
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}
	return req;
});

//auth
export const signIn = (userData) => API.post('/user/signin', userData);
export const signUp = (userData) => API.post('/user/signup', userData);

//rubrics
export const getRubrics = () => API.get('/rubrics');

export const createRubric = (newRubric) => API.post('/rubrics', newRubric);

export const updateRubric = (id, updatedRubric) =>
	API.patch(`/rubrics/${id}`, updatedRubric);

export const deleteRubric = (id) => API.delete(`/rubrics/${id}`);

//files
export const getFiles = () => API.get('/files');

//filedata
export const getFileData = () => API.get('/filedata');

export const createFileData = (newData) => API.post('/filedata', newData);

export const updateFileData = (id, updatedData) =>
	API.patch(`/filedata/${id}`, updatedData);

export const deleteFileData = (id) => API.delete(`/filedata/${id}`);

