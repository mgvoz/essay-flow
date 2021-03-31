import React from 'react';

function Dashboard({ currentUser }) {
	return (
		<div className='page-container'>
			<div className='dashboard-container'>
				<h1>{currentUser.nameOfUser}'s Dashboard</h1>
				<p>All of your essay stats in one place.</p>
				<div className='container'>
					<div id='dash-row' className='row align-items-center'>
						<div id='dash-col' className='col-sm'>
							<h5>1</h5>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>2</h5>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Last Essay Graded</h5>
						</div>
					</div>
					<div id='dash-row' className='row align-items-center'>
						<div id='dash-col' className='col-sm'>
							<h5>Average Essay Score</h5>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Graded</h5>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Uploaded</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
