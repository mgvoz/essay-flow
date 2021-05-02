import React from 'react';
import logo from '../images/twitter_header_photo_2.png';

function Home() {
	return (
		<div className='page-container'>
			<div className='login-page'>
				<h1 className='main-title'>Welcome to Essay Flow!</h1>
				<p className='main-description'>
					Essay Flow is built for teachers, by a teacher. Never before
					has your essay-grading workflow been easier. Please sign up
					or sign in to continue.
				</p>
			</div>
			<img className='home-logo' src={logo} alt='logo' />
		</div>
	);
}

export default Home;
