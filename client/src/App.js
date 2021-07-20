import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Library from './components/Library.js';
import Dashboard from './components/Dashboard.js';
import Upload from './components/Upload.js';
import Grade from './components/Grade.js';
import Home from './components/Home.js';
import Footer from './components/Footer.js';
import Auth from './components/Auth.js';
import CreateRubric from './components/CreateRubric.js';
import { getRubrics } from './actions/rubrics';
import { getFiles } from './actions/files';
import { getFileData } from './actions/filedata';

const App = () => {
	const user = JSON.parse(localStorage.getItem('profile'));
	const dispatch = useDispatch();
	const rubrics = useSelector((state) => state.rubrics);
	const files = useSelector((state) => state.files);
	const fileData = useSelector((state) => state.filedata);

	const userID = user?.result?._id || user?.result?.googleId;

	const [currentRubricId, setCurrentRubricId] = useState(0);
	const [currentFileId, setCurrentFileId] = useState(0);
	const [currentFileDataId, setCurrentFileDataId] = useState(0);

	useEffect(() => {
		dispatch(getRubrics());
	}, [currentRubricId, dispatch]);

	useEffect(() => {
		dispatch(getFiles());
	}, [currentFileId, dispatch]);

	useEffect(() => {
		dispatch(getFileData());
	}, [currentFileDataId, dispatch]);

	//access only signed-in user's rubrics
	const thisUsersRubrics = rubrics.filter(
		(rubric) =>
			user?.result?.name === rubric?.name ||
			user?.result?.name === rubric?.name,
	);

	//access only signed-in user's files
	const fileArr = [];
	for (let f in files) {
		fileArr.push(files[f]);
	}
	const flatArr = fileArr.flat(2);

	const thisUsersFiles = flatArr.filter(
		(file) =>
			user?.result?.googleId === file?.metadata ||
			user?.result?._id === file?.metadata,
	);

	//access only signed-in user's file data
	const thisUsersFileData = fileData.filter(
		(data) =>
			user?.result?.googleId === data?.userId ||
			user?.result?._id === data?.userId,
	);

	return (
		<>
			<BrowserRouter>
				<Navbar userID={userID} />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/auth'>
						<Auth />
					</Route>
					<Route exact path='/dashboard'>
						<Dashboard
							thisUsersRubrics={thisUsersRubrics}
							thisUsersFiles={thisUsersFiles}
							thisUsersFileData={thisUsersFileData}
						/>
					</Route>
					<Route exact path={`/upload/${userID}`}>
						<Upload userID={userID} />
					</Route>
					<Route exact path='/create-edit-rubric/*'>
						<CreateRubric
							currentRubricId={currentRubricId}
							setCurrentRubricId={setCurrentRubricId}
						/>
					</Route>
					<Route exact path='/library/*'>
						<Library
							currentRubricId={currentRubricId}
							setCurrentRubricId={setCurrentRubricId}
							currentFileId={currentFileId}
							setCurrentFileId={setCurrentFileId}
							thisUsersRubrics={thisUsersRubrics}
							thisUsersFiles={thisUsersFiles}
							thisUsersFileData={thisUsersFileData}
						/>
					</Route>
					<Route exact path='/grade/:id'>
						<Grade
							currentRubricId={currentRubricId}
							setCurrentRubricId={setCurrentRubricId}
							thisUsersRubrics={thisUsersRubrics}
							thisUsersFiles={thisUsersFiles}
							thisUsersFileData={thisUsersFileData}
						/>
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;

