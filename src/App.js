import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { getUsers } from './actions/users';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/Signup.js';
import Navbar from './components/Navbar.js';
import Library from './components/Library.js';
import Dashboard from './components/Dashboard.js';
import Upload from './components/Upload.js';
import Grade from './components/Grade.js';
import Login from './components/Login.js';
import Footer from './components/Footer.js';
import Forgot from './components/Forgot.js';
import CreateRubric from './components/CreateRubric.js';

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);

	console.log(users);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/signup'>
						<Signup />
					</Route>
					<Route exact path='/forgot'>
						<Forgot />
					</Route>
					<Route exact path='/dashboard'>
						<Dashboard currentUser={users[4]} />
					</Route>
					<Route exact path='/upload'>
						<Upload />
					</Route>
					<Route exact path='/create-rubric'>
						<CreateRubric currentUser={users[5]} />
					</Route>
					<Route exact path='/library'>
						<Library currentUser={users[5]} />
					</Route>
					<Route exact path='/grade/:id'>
						<Grade />
					</Route>
					<Route exact path='/'>
						<Login />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</>
	);
};

export default App;
