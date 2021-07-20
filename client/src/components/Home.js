import React, { useState, useEffect } from 'react';
import logo from '../images/twitter_header_photo_2.png';

function Home() {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		setTimeout(() => setWidth(window.innerWidth), 200);
	}, []);

	return (
		<>
			{width >= 500 ? (
				<div className='page-container'>
					<div className='login-page'>
						<h1 className='main-title'>Welcome to Essay Flow!</h1>
						<p className='main-description'>
							Essay Flow is built for teachers, by a teacher.
							Never before has your essay-grading workflow been
							easier. Please sign up or sign in to continue.
						</p>
					</div>
					<img className='home-logo' src={logo} alt='logo' />
				</div>
			) : (
				<div className='page-container'>
					<div className='login-page'>
						<h1 className='main-title'>Welcome to Essay Flow!</h1>
						<p className='main-description'>
							ATTENTION: Essay Flow is meant to be used on laptop
							or desktop computers, rather than mobile. Please
							navigate to this page on a laptop or desktop to
							continue.
						</p>
					</div>
					<img className='home-logo' src={logo} alt='logo' />
				</div>
			)}
		</>
	);
}

export default Home;

