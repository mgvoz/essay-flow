import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem('profile')).token
		}`;
	}
	return req;
});

export const signIn = (userData) => API.post('/user/signin', userData);
export const signUp = (userData) => API.post('/user/signup', userData);

export const getRubrics = () => API.get('/rubrics');

export const createRubric = (newRubric) => API.post('/rubrics', newRubric);

export const updateRubric = (id, updatedRubric) =>
	API.patch(`/rubrics/${id}`, updatedRubric);

export const deleteRubric = (id) => API.delete(`/rubrics/${id}`);

export const getFiles = () => API.get('/files');

export const addFile = (newFile) =>
	API.post('/files/upload', newFile, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const updateFile = (id, updatedFile) =>
	API.patch(`/files/${id}`, updatedFile);

export const deleteFile = (id) => API.delete(`/files/${id}`);
