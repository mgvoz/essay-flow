import React from 'react';

function Dashboard({ rubrics, files, fileData }) {
	//set variables
	const user = JSON.parse(localStorage.getItem('profile'));

	//get only rubrics created by signed in user
	const thisUsersRubrics = rubrics.filter(
		(rubric) =>
			user?.result?.name === rubric?.name ||
			user?.result?.name === rubric?.name,
	);

	//get only files uploaded by signed in user
	const fileArr = [];
	for (let f in files) {
		fileArr.push(files[f]);
	}
	const flatArr = fileArr.flat(2);

	const thisUsersFiles = flatArr.filter(
		(file) =>
			user?.result?.googleId === file?.metadata ||
			user?.result?._id === file?.metadata,
	);

	//get only filedata for signed in user
	const thisUsersFileData = fileData.filter(
		(data) =>
			user?.result?.googleId === data?.userId ||
			user?.result?._id === data?.userId,
	);

	//get # of essays graded
	const essaysGraded = thisUsersFileData.filter(
		(f) => f?.currentGrade !== 'Not yet graded.',
	);

	//get average essay score
	const gradesArr = [0];
	essaysGraded.forEach((f) => gradesArr.push(parseFloat(f?.currentGrade)));
	const avgGrade =
		gradesArr?.reduce((a, b) => a + b) / (gradesArr?.length - 1);
	const gradeFunc = () => {
		if (gradesArr.length === 2) {
			return gradesArr[1].toFixed(2);
		} else if (gradesArr.length === 1) {
			return 'No scores yet.';
		} else {
			return avgGrade.toFixed(2);
		}
	};

	//get average time spent grading each essay
	const times = [0];
	essaysGraded.forEach((f) => times.push(parseFloat(f?.timeSpentGrading)));
	const avgTime = times?.reduce((a, b) => a + b) / times?.length;

	//get last graded essay
	let updates = [0];
	essaysGraded.forEach((f) => updates.push(f?.lastUpdated));
	const mostRecentDate = updates.sort((a, b) => new Date(b) - new Date(a))[0];
	const recentEssay = thisUsersFileData.filter(
		(f) => f?.lastUpdated === mostRecentDate,
	);

	console.log(thisUsersFiles);
	console.log(thisUsersFileData);

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
							<div className='stat-container'>
								<p className='dash-stat'>
									{recentEssay[0] === undefined
										? 'No grades yet.'
										: recentEssay[0]?.filename +
										  ' (' +
										  recentEssay[0]?.student +
										  ')'}
								</p>
							</div>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Average Time To Grade Each Essay</h5>
							<div className='stat-container2'>
								<p className='dash-stat'>
									{(avgTime / 60).toFixed(2)} minutes
								</p>
							</div>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Average Essay Score</h5>
							<div className='stat-container'>
								<p className='dash-stat'>{gradeFunc()}</p>
							</div>
						</div>
					</div>
					<div id='dash-row' className='row align-items-center'>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Graded</h5>
							<div className='stat-container'>
								<p className='dash-stat'>
									{essaysGraded.length}
								</p>
							</div>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Rubrics Created</h5>
							<div className='stat-container'>
								<p className='dash-stat'>
									{thisUsersRubrics.length === 0
										? 0
										: thisUsersRubrics.length}
								</p>
							</div>
						</div>
						<div id='dash-col' className='col-sm'>
							<h5>Total # of Essays Uploaded</h5>
							<div className='stat-container'>
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
		</div>
	);
}

export default Dashboard;
