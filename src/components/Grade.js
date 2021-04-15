import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFile } from '../actions/files';

export default function Grade({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
}) {
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
	console.log(flatArr);

	const thisUsersFiles = flatArr.filter(
		(file) =>
			user?.result?.googleId === file?.metadata.userId ||
			user?.result?._id === file?.metadata.userId,
	);

	console.log(thisUsersFiles);

	const currentFile = thisUsersFiles.filter((f) => f._id === currentFileId);

	console.log(currentFile);

	//add inputs for notes and grade
	return (
		<div className='page-container'>
			<div className='grade-container'>
				<div className='grade-title-container'>
					<p className='grader-title'>
						Now Grading: "{currentFile[0].filename}"
					</p>
					<p className='grader-title'>
						Student: {currentFile[0].metadata.student}
					</p>
					<p className='grader-grade'>
						Current Grade: {currentFile[0].metadata.currentGrade}%
					</p>
				</div>
				<div id='grader' className='container-fluid'>
					<div className='row'>
						<div id='view-col' className='col-8'>
							<h5 className='viewer-title'>View</h5>
							<iframe title='grade-frame' className='grade-frame'>
								display selected document here
							</iframe>
						</div>
						<div id='grade-col' className='col-4'>
							<h5 className='viewer-title'>Rubric</h5>
							<div className='select-rubric'>
								<h5>Select Rubric</h5>
								<form>
									<div className='form-group'>
										<select className='form-control'>
											{thisUsersRubrics.length === 0 ? (
												<option disabled>
													No Rubrics Available -
													Create Rubrics On The Rubric
													Builder Page
												</option>
											) : (
												thisUsersRubrics.map(
													(rubric) => (
														<option
															key={rubric._id}
														>
															{rubric.title}
														</option>
													),
												)
											)}
										</select>
									</div>
								</form>
							</div>
							{/*add logic to display rubric if one is selected*/}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
