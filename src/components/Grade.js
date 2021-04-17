import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFile } from '../actions/files';
import GradingRubric from './GradingRubric';

export default function Grade({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
}) {
	const user = JSON.parse(localStorage.getItem('profile'));

	const [grade, setGrade] = useState(0);
	const [notes, setNotes] = useState([]);
	const [rubricSelections, setRubricSelections] = useState([]);

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

	/*const cookieArr = document.cookie.split(';');
	const newCooks = cookieArr.map((cook) => cook.split('='));
	const cook = newCooks.filter((c) => c[0] === ' currentFileId');*/

	const currentFile = thisUsersFiles.filter((f) => f._id === currentFileId);

	console.log('currentFile:', currentFile);
	console.log(notes);

	//make each cell a button that adds the grade based on entered point values; each cell button will add that description to the notes array and have green outline when selected- only one selection per row; "re-grade" should take them exactly to how the table looked with selections; make essay appear in left section???; get grade page to retain currentFileId even when refreshed- cookies?

	return (
		<div className='page-container'>
			<div className='grade-container'>
				<div className='grade-title-container'>
					<p className='grader-title'>
						Now Grading: <em>"{currentFile[0].filename}"</em>
					</p>
					<p className='grader-title'>
						Student: <em>{currentFile[0].metadata.student}</em>
					</p>
					<p className='grader-grade'>
						Current Grade:{' '}
						{currentFile[0].metadata.currentGrade ===
						'Not yet graded.'
							? grade
							: currentFile[0].metadata.currentGrade}
						%
					</p>
					<center>
						<form
							className='grader-button'
							method='GET'
							action={
								'http://localhost:5000/files/grade/' +
								currentFileId
							}
						>
							<button
								type='submit'
								className='btn btn btn-primary'
								onClick={() => {
									document.cookie = `currentGrade = ${grade}; path=/`;
									document.cookie = `notes = ${
										(rubricSelections, notes)
									}; path=/`;
								}}
							>
								Submit Grade & Notes
							</button>
						</form>
					</center>
				</div>
				<div id='grader' className='container-fluid'>
					<div className='row'>
						<div id='view-col' className='col-8'>
							<h5 className='viewer-title'>Essay</h5>
							<div title='grade-frame' className='grade-frame'>
								<iframe
									src={
										'https://localhost:5000/files' +
										currentFile._id
									}
									frameBorder='0'
								></iframe>
							</div>
						</div>
						<div id='grade-col' className='col-4'>
							<h5 className='viewer-title'>Rubric</h5>
							<div className='select-rubric'>
								<h5>Select Rubric</h5>
								<form>
									<div className='form-group'>
										<select
											className='form-control'
											onChange={(e) =>
												setCurrentRubricId(
													e.target.value,
												)
											}
										>
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
															readOnly
															value={rubric._id}
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
							{currentRubricId ? (
								<GradingRubric
									thisUsersRubrics={thisUsersRubrics}
									currentRubricId={currentRubricId}
									currentFileId={currentFileId}
								/>
							) : null}
							<label className='notes-label' for='notes'>
								Notes:
							</label>
							<br />
							<textarea
								className='notes-text'
								name='notes'
								cols='auto'
								rows='auto'
								onChange={(e) => setNotes(e.target.value)}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
