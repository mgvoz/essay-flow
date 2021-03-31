import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../actions/users';

const Signup = () => {
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		nameOfUser: '',
		email: '',
		password: '',
		rubrics: [{}],
		files: [{}],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createUser(userData));
		//redirect to login page
	};

	return (
		<div className='page-container'>
			<div className='signup-container'>
				<h2 className='signup-heading'>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='nameOfUser'>Enter Name:</label>
						<input
							name='nameOfUser'
							type='name'
							className='form-control'
							value={userData.nameOfUser}
							onChange={(e) =>
								setUserData({
									...userData,
									nameOfUser: e.target.value,
								})
							}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Enter Email:</label>
						<input
							name='email'
							type='email'
							className='form-control'
							aria-describedby='emailHelp'
							value={userData.email}
							onChange={(e) =>
								setUserData({
									...userData,
									email: e.target.value,
								})
							}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>
							Create Password:
						</label>
						<input
							name='password'
							type='password'
							className='form-control'
							value={userData.password}
							onChange={(e) =>
								setUserData({
									...userData,
									password: e.target.value,
								})
							}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							Passwords must be at least 8 characters, including
							letters and numbers.
						</small>
					</div>
					<center>
						<button type='submit' className='btn btn-primary'>
							Create Account
						</button>
					</center>
				</form>
			</div>
		</div>
	);
};

export default Signup;
