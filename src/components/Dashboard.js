import React from 'react';

function Dashboard({ rubrics, files }) {
	const user = JSON.parse(localStorage.getItem('profile'));
	return (
		<div className='page-container'>
			<div className='dashboard-container'>
				<h1>{user.result.name}'s Dashboard</h1>
				<p>
					To get started, build a rubric and upload your files, or
					pick up from where you left off.
				</p>
				<div className='container'>
					<div id='dash-row' className='row align-items-center'>
						<div id='dash-col' className='col-sm'>
							<h5>Last Essay Graded</h5>
							<p></p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Avg. Time Spent Grading Each Essay</h5>
							<p className='dash-stat'></p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Average Essay Score</h5>
							<p className='dash-stat'></p>
						</div>
					</div>
					<div id='dash-row' className='row align-items-center'>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Graded</h5>
							<p className='dash-stat'></p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Rubrics Created</h5>
							<p className='dash-stat'>{rubrics.length}</p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Uploaded</h5>
							<p className='dash-stat'>{/*files.length*/}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
