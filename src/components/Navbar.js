import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../constants/actionTypes';

const Navbar = () => {
	//set variables
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('profile')),
	);

	//dispatch logout function for logout button
	const logout = () => {
		dispatch({ type: actionType.LOGOUT });

		history.push('/auth');

		setUser(null);
	};

	//get user info for navbar, set auto-logout
	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);

	return (
		<div>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<Link to='/'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNavAltMarkup'
					aria-controls='navbarNavAltMarkup'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				{user ? (
					<div
						className='collapse navbar-collapse'
						id='navbarNavAltMarkup'
					>
						<div className='navbar-nav mr-auto'>
							<Link to='/dashboard' className='nav-item nav-link'>
								Dashboard
							</Link>
							<Link
								to='/create-edit-rubric/*'
								className='nav-item nav-link'
							>
								Rubric Builder
							</Link>
							<Link to='/upload' className='nav-item nav-link'>
								Upload Essays
							</Link>
							<Link to='/library/*' className='nav-item nav-link'>
								Library
							</Link>
						</div>
						<div className='navbar-nav ml-auto'>
							<span className='navbar-text'>
								{user.result.name}
							</span>
							<button
								id='logout-button'
								className='btn btn-primary'
								type='submit'
								onClick={logout}
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<div
						className='collapse navbar-collapse'
						id='navbarNavAltMarkup'
					>
						<div className='navbar-nav'>
							<Link to='/auth' className='nav-item nav-link'>
								Login
							</Link>
						</div>
					</div>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
