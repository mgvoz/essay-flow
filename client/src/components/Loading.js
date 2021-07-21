import React from 'react';
import logo from '../images/twitter_header_photo_2.png';

function Loading() {
	return (
		<div className='page-container'>
			<center>
				<img
					className='loading-logo'
					src={logo}
					alt='Essay-Flow Logo'
				/>
				<h2 className='loading-heading'>Loading your data...</h2>
			</center>
		</div>
	);
}

export default Loading;
