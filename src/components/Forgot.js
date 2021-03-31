import React from 'react';
import { Link } from 'react-router-dom';

function Forgot() {
	return (
		<div className='page-container'>
			<div className='forgot-container'>
				<h2 className='forgot-heading'>Forgot Password</h2>
				<form>
					<div class='form-group'>
						<label for='name'>Name:</label>
						<input type='name' class='form-control' />
					</div>
					<div class='form-group'>
						<label for='email'>Email:</label>
						<input type='email' class='form-control' />
					</div>
					<center>
						<button type='submit' class='btn btn-primary'>
							Submit
						</button>
					</center>
				</form>
				<div className='login-links'>
					<p>
						Need an account?{' '}
						<Link className='signup-link' to='/signup'>
							Sign up here.
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Forgot;
