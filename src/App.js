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
import Forgot from './components/Forgot.js';
import Auth from './components/Auth.js';
import ViewEditRubric from './components/ViewEditRubric.js';
import CreateRubric from './components/CreateRubric.js';
import { getRubrics } from './actions/rubrics';
import { getFiles } from './actions/files';

const App = () => {
	const dispatch = useDispatch();
	const rubrics = useSelector((state) => state.rubrics);
	console.log(rubrics);
	const files = useSelector((state) => state.files);
	console.log(files);
	const [currentId, setCurrentId] = useState(0);

	useEffect(() => {
		dispatch(getRubrics());
	}, [currentId, dispatch]);

	useEffect(() => {
		dispatch(getFiles());
	}, [currentId, dispatch]);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/auth'>
						<Auth />
					</Route>
					<Route exact path='/forgot'>
						<Forgot />
					</Route>
					<Route exact path='/dashboard'>
						<Dashboard rubrics={rubrics} files={files} />
					</Route>
					<Route exact path='/upload'>
						<Upload />
					</Route>
					<Route exact path='/create-rubric/*'>
						<CreateRubric
							currentId={currentId}
							setCurrentId={setCurrentId}
						/>
					</Route>
					<Route exact path='/view-edit-rubric'>
						<ViewEditRubric rubrics={rubrics} />
					</Route>
					<Route exact path='/library'>
						<Library rubrics={rubrics} files={files} />
					</Route>
					<Route exact path='/grade/*'>
						<Grade rubrics={rubrics} files={files} />
					</Route>
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
