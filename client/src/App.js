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
							rubrics={rubrics}
							files={files}
							fileData={fileData}
						/>
					</Route>
					<Route exact path={`/upload/${user?.result?.googleId || user?.result?._id}`}>
						<Upload userID={user?.result?.googleId || user?.result?._id} />
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
							rubrics={rubrics}
							files={files}
							fileData={fileData}
						/>
					</Route>
					<Route exact path='/grade/:id'>
						<Grade
							currentRubricId={currentRubricId}
							setCurrentRubricId={setCurrentRubricId}
							rubrics={rubrics}
							files={files}
							fileData={fileData}
						/>
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;

