import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../actions/auth';

const Auth = () => {
	//set variables
	const dispatch = useDispatch();
	const history = useHistory();
	const [isSignup, setIsSignup] = useState(false);
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	//switch between log in and sign up
	const switchMode = () => {
		setIsSignup(!isSignup);
	};

	//submit log in or sign up
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			dispatch(signup(userData, history));
		} else {
			dispatch(signin(userData, history));
		}
	};

	//capture user input
	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	//google sign in- success and failure
	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history.push('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		isSignup
			? console.log(
					'Google signup was unsuccessful. Try again later',
					error,
			  )
			: console.log(
					'Google sign in was unsuccessful. Try again later',
					error,
			  );
	};

	return (
		<div className='page-container'>
			<div className='login-container'>
				<h2 className='login-heading'>
					{isSignup ? 'Sign Up' : 'Log In'}
				</h2>
				<form onSubmit={handleSubmit}>
					{isSignup && (
						<>
							<div className='form-group'>
								<label htmlFor='name'>Enter Name:</label>
								<input
									required
									autoFocus
									name='name'
									type='name'
									className='form-control'
									onChange={handleChange}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='email'>Enter Email:</label>
								<input
									required
									name='email'
									type='email'
									className='form-control'
									aria-describedby='emailHelp'
									onChange={handleChange}
								/>
								<small
									id='emailHelp'
									className='form-text text-muted'
								>
									We'll never share your email with anyone
									else.
								</small>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputPassword1'>
									Create Password:
								</label>
								<input
									required
									name='password'
									type='password'
									className='form-control'
									onChange={handleChange}
								/>
								<small
									id='emailHelp'
									className='form-text text-muted'
								>
									Passwords must be at least 8 characters,
									including letters and numbers.
								</small>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputPassword1'>
									Re-type Password:
								</label>
								<input
									required
									name='confirmPassword'
									type='password'
									className='form-control'
									onChange={handleChange}
								/>
							</div>
							<center>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Create Account
								</button>
							</center>
							<center>
								<GoogleLogin
									clientId='1020971190397-g61qib3h1gr5oanu6qd7ebgu8j6cmvvh.apps.googleusercontent.com'
									render={(renderProps) => (
										<button
											className='btn btn-primary'
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
										>
											Or Signup with Google
										</button>
									)}
									onSuccess={googleSuccess}
									onFailure={googleFailure}
									cookiePolicy='single_host_origin'
								/>
							</center>
							<button
								className='btn btn-primary'
								onClick={switchMode}
							>
								Already have an account? Sign in here.
							</button>
						</>
					)}
					{!isSignup && (
						<>
							<div className='form-group'>
								<label htmlFor='username'>Username:</label>
								<input
									name='email'
									type='email'
									className='form-control'
									required
									autoFocus
									onChange={handleChange}
								/>
								<small
									id='emailHelp'
									className='form-text text-muted'
								>
									This will be your email address.
								</small>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password:</label>
								<input
									required
									name='password'
									type='password'
									className='form-control'
									onChange={handleChange}
								/>
							</div>
							<center>
								<button
									onClick={handleSubmit}
									type='submit'
									className='btn btn-primary'
								>
									Submit
								</button>
							</center>
							<center>
								<GoogleLogin
									clientId='1020971190397-g61qib3h1gr5oanu6qd7ebgu8j6cmvvh.apps.googleusercontent.com'
									render={(renderProps) => (
										<button
											className='btn btn-primary'
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
										>
											Or Sign In with Google
										</button>
									)}
									onSuccess={googleSuccess}
									onFailure={googleFailure}
									cookiePolicy='single_host_origin'
								/>
							</center>
							<div className='login-links'>
								<button
									className='btn btn-primary'
									onClick={switchMode}
								>
									Click here to create an account.
								</button>
							</div>
						</>
					)}
				</form>
			</div>
		</div>
	);
};

export default Auth;
