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

	const currentFile = useSelector((state) =>
		currentFileId ? state.files.find((f) => f._id === currentFileId) : null,
	);

	const thisUsersRubrics = rubrics.filter(
		(rubric) =>
			user?.result?.name === rubric?.name ||
			user?.result?.name === rubric?.name,
	);

	const thisUsersFiles = files.filter(
		(file) =>
			user?.result?.name === file?.name ||
			user?.result?.name === file?.name,
	);

	console.log(thisUsersRubrics);

	//add inputs for notes and grade
	return (
		<div className='page-container'>
			<div className='grade-container'>
				<div className='grade-title-container'>
					<p className='grader-title'>
						Now Grading: "{/*currentFile.fileInfo.name*/}"
					</p>
					<p className='grader-title'>
						Student: {currentFile.student}
					</p>
					<p className='grader-grade'>
						Current Grade: {currentFile.currentGrade}%
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
