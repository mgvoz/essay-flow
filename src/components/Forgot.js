import React from 'react';
import { useHistory } from 'react-router-dom';

function Forgot() {
	const history = useHistory();

	return (
		<div className='page-container'>
			<div className='forgot-container'>
				<h2 className='forgot-heading'>Forgot Password</h2>
				<form>
					<div class='form-group'>
						<label for='email'>
							Enter email associated with your account:
						</label>
						<input type='email' class='form-control' />
					</div>
					<center>
						<button type='submit' class='btn btn-primary'>
							Submit
						</button>
					</center>
				</form>
				<div className='login-links'>
					<center>
						<button
							className='btn btn-primary'
							onClick={() => history.push('/auth')}
						>
							Click here to create an account
						</button>
					</center>
				</div>
			</div>
		</div>
	);
}

export default Forgot;
