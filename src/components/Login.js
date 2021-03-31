import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
	return (
		<div className='page-container'>
			<div className='login-page'>
				<h1 className='main-title'>Welcome to Essay Flow!</h1>
				<p className='main-description'>
					Essay Flow is built for teachers, by a teacher. Never before
					has your essay-grading workflow been easier. Please sign up
					or sign in to continue.
				</p>
				<div className='login-container'>
					<h2 className='login-heading'>Log In</h2>
					<form>
						<div className='form-group'>
							<label htmlFor='username'>Username:</label>
							<input type='email' className='form-control' />
							<small
								id='emailHelp'
								className='form-text text-muted'
							>
								This will be your email address.
							</small>
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password:</label>
							<input type='password' className='form-control' />
						</div>
						<center>
							<button type='submit' className='btn btn-primary'>
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
						<p>
							Forgot password?{' '}
							<Link className='forgot-link' to='/forgot'>
								Click here.
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
