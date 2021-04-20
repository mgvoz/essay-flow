import React, { useState } from 'react';
import GradingRubric from './GradingRubric';
import { useHistory } from 'react-router-dom';

export default function Grade({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
}) {
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();
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

	//make essay appear in left section???; get grade page to retain currentFileId even when refreshed- cookies?

	/*const cookieArr = document.cookie.split(';');
	const newCooks = cookieArr.map((cook) => cook.split('='));
	const cook = newCooks.filter((c) => c[0] === ' currentFileId');*/

	const currentFile = thisUsersFiles.filter((f) => f._id === currentFileId);

	const selections = document.getElementsByName('cell');
	const finalSelections = Array.from(selections).filter(
		(cell) => cell.style[0] === 'border-top-width',
	);
	console.log(finalSelections[0].parentElement);
	//use above to save final selections to DB

	const handleGrade = (c, r, col, row) => {
		console.log(r.parentElement);
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
	/*setRubricSelections([
		...rubricSelections,
		row + ': ' + c.innerText + ' - ' + col + ' points',
	]);*/
	console.log(finalSelections);
	console.log(rubricSelections);

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
								document.cookie = `notes = "Rubric: ${rubricSelections}, Custom Notes: "${notes}; path=/`;
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
									grade={grade}
									setGrade={setGrade}
									handleGrade={handleGrade}
									thisUsersRubrics={thisUsersRubrics}
									currentRubricId={currentRubricId}
									currentFileId={currentFileId}
									rubricSelections={rubricSelections}
									setRubricSelections={setRubricSelections}
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
