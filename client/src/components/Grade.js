import React, { useState } from 'react';
import GradingRubric from './GradingRubric';
import { useHistory, useParams } from 'react-router-dom';
import TimeMe from 'timeme.js';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';

export default function Grade({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	rubrics,
	files,
}) {
	//set variables
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const user = JSON.parse(localStorage.getItem('profile'));
	const history = useHistory();
	var { id } = useParams();
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
			user?.result?.googleId === file?.metadata?.userId ||
			user?.result?._id === file?.metadata?.userId,
	);

	//get all data for current file selected with ID
	var currentFile = thisUsersFiles.filter((f) => f._id === id);

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

	//time spent on page
	TimeMe.initialize({ currentPageName: 'grade', idleTimeoutInSeconds: 60 });
	let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();

	//save file to local storage for display on page
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://essay-flow.herokuapp.com/files/essay/' + currentFile[0]?._id);
	xhr.overrideMimeType('application/pdf');
	xhr.responseType = 'blob';
	xhr.onload = function () {
		if (xhr.status && xhr.status === 200) {
			saveFile(xhr.response, 'selectedFile');
		}
	};
	xhr.send();

	function saveFile(file, key) {
		var fileReader = new FileReader();
		fileReader.onload = function (evt) {
			var result = evt.target.result;
			try {
				localStorage.setItem(key, result);
			} catch (e) {
				console.log('Storage failed: ' + e);
			}
		};
		fileReader.readAsDataURL(file);
	}

	const data = localStorage.getItem('selectedFile');

	return (
		<div className='page-container'>
			<div className='grade-container'>
				<div className='grade-title-container'>
					<p className='grader-title'>
						Now Grading: <em>"{currentFile[0]?.filename}"</em>
					</p>
					<p className='grader-title'>
						Student: <em>{currentFile[0]?.metadata?.student}</em>
					</p>
					<p className='grader-grade'>
						Current Score:{' '}
						{grade || currentFile[0]?.metadata?.currentGrade}
					</p>

					<form
						className='grader-button'
						onSubmit={() => {
							localStorage.setItem('selectedFile', '');
							history.push('/library/*');
						}}
					>
						<button type='submit' className='btn btn btn-primary'>
							Go Back Without Saving
						</button>
					</form>

					<form
						className='grader-button'
						method='GET'
						action={
							'https://essay-flow.herokuapp.com/files/grade/' + currentFileId
						}
					>
						<button
							type='submit'
							className='btn btn btn-primary'
							onClick={() => {
								document.cookie = `currentGrade = ${grade}; path=/`;
								document.cookie = `notes = "Rubric: ${rubricData}, Custom Notes: ${notes}"; path=/`;
								document.cookie = `timeSpentGrading = ${timeSpentOnPage}; path=/`;
								document.cookie = `lastUpdated = ${new Date()}; path=/`;
								localStorage.setItem('selectedFile', '');
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
							<div className='grade-frame'>
								{data ? (
									<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
										<Viewer
											fileUrl={data}
											plugins={[
												defaultLayoutPluginInstance,
											]}
										/>
									</Worker>
								) : (
									<h5 className='view-instructions'>
										Select rubric to begin grading.
									</h5>
								)}
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
											<option
												defaultValue
												selected
												disabled
											>
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
