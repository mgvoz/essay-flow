import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
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

				<div
					className='collapse navbar-collapse'
					id='navbarNavAltMarkup'
				>
					<div className='navbar-nav'>
						<Link to='/dashboard' className='nav-item nav-link'>
							Dashboard
						</Link>
						<Link to='/upload' className='nav-item nav-link'>
							Upload
						</Link>
						<Link to='/create-rubric' className='nav-item nav-link'>
							Rubric Builder
						</Link>
						<Link to='/library' className='nav-item nav-link'>
							Library
						</Link>
						<Link to='/logout' className='nav-item nav-link'>
							Log Out
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
