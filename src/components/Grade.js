import React, { useState } from 'react';
import GradingRubric from './GradingRubric';
import { useHistory } from 'react-router-dom';

export default function Grade({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	rubrics,
	files,
}) {
	/*************************************/

	//make essay appear in left section???; get grade page to retain currentFileId even when refreshed- cookies? see below

	/*************************************/

	const cookieArr = document.cookie.split(';');
	const newCooks = cookieArr.map((cook) => cook.split('='));
	const cook = newCooks.filter((c) => c[0] === ' currentFileId');
	console.log(cook);
	const fileInUse = cook[0][1];
	console.log(fileInUse);

	//set variables
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();
	const [grade, setGrade] = useState(0);
	const [notes, setNotes] = useState([]);
	const rubricData = [];

	//access only signed-in user's rubrics
	const thisUsersRubrics = rubrics.filter(
		(rubric) =>
			user?.result?.name === rubric?.name ||
			user?.result?.name === rubric?.name,
	);

	//access only signed-in user's files
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

	//get all data for current file selected with ID
	var currentFile = thisUsersFiles.filter((f) => f._id === fileInUse);

	//show selections from rubric, add grade
	const handleGrade = (c, r, col, row) => {
		if (
			Array.from(r.children).filter(
				(child) => child.style[0] === 'border-top-width',
			).length < 1
		) {
			if (c.style.border === '') {
				c.style = 'border: 2px solid #2dac6d';
				setGrade(grade + parseInt(col));
			} else {
				c.style = '';
				setGrade(grade - parseInt(col));
			}
		} else if (
			c.style.borderTopWidth === '2px' &&
			Array.from(r.children).filter(
				(child) => child.style[0] === 'border-top-width',
			).length === 1
		) {
			c.style = '';
			setGrade(grade - parseInt(col));
		} else {
			alert(
				'Select only one cell per row. Please de-select your current selection to make a different selection.',
			);
		}
	};

	//access data from selections to save to file metadata
	const selections = document.getElementsByName('cell');
	const finalSelections = Array.from(selections).filter(
		(cell) => cell.style[0] === 'border-top-width',
	);
	finalSelections.forEach((selection) => {
		var index = Array.prototype.indexOf.call(
			selection.parentNode.children,
			selection,
		);
		var corresponding_th = document.querySelector(
			'#rubric-grade-table th:nth-child(' + (index + 1) + ')',
		);
		var colName = corresponding_th.innerHTML;
		var rowName = selection.parentNode.children[0].innerText;

		rubricData.push(
			' ' +
				rowName +
				': ' +
				selection.innerText +
				' - ' +
				colName +
				' point(s)',
		);
	});

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
						{grade || currentFile[0].metadata.currentGrade}%
					</p>

					<form className='grader-button'>
						<button
							type='submit'
							className='btn btn btn-primary'
							onClick={() => history.push('/library/*')}
						>
							Go Back Without Saving
						</button>
					</form>

					<form
						className='grader-button'
						method='GET'
						action={
							'http://localhost:5000/files/grade/' + currentFileId
						}
					>
						<button
							type='submit'
							className='btn btn btn-primary'
							onClick={() => {
								document.cookie = `currentGrade = ${grade}; path=/`;
								document.cookie = `notes = "Rubric: ${rubricData}, Custom Notes: ${notes}"; path=/`;
							}}
						>
							Submit Grade & Notes
						</button>
					</form>
				</div>
				<div id='grader' className='container-fluid'>
					<div className='row'>
						<div id='view-col' className='col-8'>
							<h5 className='viewer-title'>Essay</h5>
							<div title='grade-frame' className='grade-frame'>
								<iframe
									title='doc-viewer'
									src={
										'https://localhost:5000/files/essay/' +
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
											<option selected disabled>
												Select Rubric
											</option>
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
									handleGrade={handleGrade}
									thisUsersRubrics={thisUsersRubrics}
									currentRubricId={currentRubricId}
								/>
							) : null}
							<label className='notes-label' htmlFor='notes'>
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
