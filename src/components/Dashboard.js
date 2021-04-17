import React from 'react';

function Dashboard({ rubrics, files }) {
	const user = JSON.parse(localStorage.getItem('profile'));

	const thisUsersRubrics = rubrics.filter(
		(rubric) =>
			user?.result?.name === rubric?.name ||
			user?.result?.name === rubric?.name,
	);

	const fileArr = [];
	for (let f in files) {
		fileArr.push(files[f]);
	}
	const flatArr = fileArr.flat(2);

	const thisUsersFiles = flatArr.filter(
		(file) =>
			user?.result?.googleId === file?.metadata.userId ||
			user?.result?._id === file?.metadata.userId,
	);

	//make function to filter essays that have a grade

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
							<p className='dash-stat'>filename</p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Avg. Time To Grade Each Essay</h5>
							<p className='dash-stat'>0:00</p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Average Essay Score</h5>
							<p className='dash-stat'>0%</p>
						</div>
					</div>
					<div id='dash-row' className='row align-items-center'>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Graded</h5>
							<p className='dash-stat'>0</p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Rubrics Created</h5>
							<p className='dash-stat'>
								{thisUsersRubrics.length === 0
									? 0
									: thisUsersRubrics.length}
							</p>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Uploaded</h5>
							<p className='dash-stat'>
								{thisUsersFiles.length === 0
									? 0
									: thisUsersFiles.length}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
