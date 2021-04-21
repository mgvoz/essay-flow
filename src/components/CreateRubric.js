import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRubric, updateRubric } from '../actions/rubrics';
import { useHistory } from 'react-router-dom';

function CreateRubric({ currentRubricId, setCurrentRubricId }) {
	//set variables
	const history = useHistory();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	const currentRubric = useSelector((state) =>
		currentRubricId
			? state.rubrics.find((r) => r._id === currentRubricId)
			: null,
	);

	//state to collect rubric criteria entered by user
	const [rubricData, setRubricData] = useState({
		title: '',
		columnHeads: [],
		rowHeads: [],
		cells: [],
	});

	//used for when users edit previously created rubric
	useEffect(() => {
		if (currentRubric) setRubricData(currentRubric);
	}, [currentRubric]);

	//function to return to library without saving changes
	const handleBack = () => {
		setCurrentRubricId(0);
		history.push('/library/*');
	};

	//used to loop through cells/their descriptions
	let index = -1;
	const rubricCells = [];
	var cellData = document.getElementsByName('desc');

	const data = () => {
		cellData.forEach((cell) => {
			rubricCells.push(cell.value);
		});
		setRubricData({ ...rubricData, cells: rubricCells });
	};

	//save rubric entries
	const handleSave = (e) => {
		e.preventDefault();
		if (currentRubricId === 0) {
			dispatch(createRubric({ ...rubricData, name: user?.result?.name }));
			setCurrentRubricId(0);
			setRubricData({
				title: '',
				columnHeads: [],
				rowHeads: [],
				cells: [],
			});
			alert('Rubric added successfully!');
			history.push('/library/*');
		} else {
			dispatch(
				updateRubric(currentRubricId, {
					...rubricData,
					name: user?.result?.name,
				}),
			);
			setCurrentRubricId(0);
			setRubricData({
				title: '',
				columnHeads: [],
				rowHeads: [],
				cells: [],
			});
			alert('Rubric updated successfully!');
			history.push('/library/*');
		}
	};

	return (
		<div className='page-container'>
			<div className='rubric-container'>
				<h1>Create/Edit Rubric</h1>
				<form>
					<div className='form-group'>
						<label htmlFor='rubric-title'>Rubric Title</label>
						<input
							type='text'
							className='form-control'
							placeholder={
								currentRubricId === 0
									? 'Research Paper Assignment'
									: null
							}
							value={rubricData.title}
							onChange={(e) =>
								setRubricData({
									...rubricData,
									title: e.target.value,
								})
							}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='rubric-cols'>
							Let's set up the columns for your rubric. Enter
							point values separated by commas:
						</label>
						<input
							type='text'
							className='form-control'
							placeholder={
								currentRubricId === 0 ? '10pts., 20pts.' : null
							}
							maxLength='25'
							value={rubricData.columnHeads}
							onChange={(e) =>
								setRubricData({
									...rubricData,
									columnHeads: e.target.value.split(','),
								})
							}
						></input>
					</div>
					<div className='form-group'>
						<label htmlFor='rubric-rows'>
							Let's set up the criteria (usually a word or short
							phrase) for the rows of your rubric. Enter criteria
							separated by commas:
						</label>
						<input
							type='text'
							className='form-control'
							placeholder={
								currentRubricId === 0
									? 'Accuracy, Organization, Conventions'
									: null
							}
							value={rubricData.rowHeads}
							onChange={(e) =>
								setRubricData({
									...rubricData,
									rowHeads: e.target.value.split(','),
								})
							}
						></input>
					</div>
				</form>
				<hr />
				<div className='table-container'>
					{rubricData !== true ? (
						<>
							<h4 className='rubric-title2'>
								{rubricData.title}
							</h4>
							<div className='table-responsive'>
								<table className='table table-bordered'>
									<thead className='thead-light'>
										<tr>
											<th className='rubric-heading'></th>
											{rubricData.columnHeads.map(
												(col, key) => {
													return (
														<th
															className='rubric-heading'
															key={key}
															scope='col'
														>
															{col}
														</th>
													);
												},
											)}
										</tr>
									</thead>
									<tbody>
										{rubricData.rowHeads.map((row, key) => {
											return (
												<tr key={key}>
													<th
														className='rubric-heading'
														scope='row'
													>
														{row}
													</th>
													{rubricData.columnHeads.map(
														(col, key) => {
															index++;
															return (
																<td
																	key={key}
																	id='test'
																	className='text-center'
																>
																	<textarea
																		className='cells'
																		name='desc'
																		id='desc'
																		cols='auto'
																		rows='auto'
																		placeholder='Click here to add description'
																		value={
																			rubricData
																				.cells[
																				index
																			]
																		}
																		onChange={
																			data
																		}
																	></textarea>
																</td>
															);
														},
													)}
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
							<center>
								<button
									onClick={handleSave}
									type='submit'
									id='rubric-btn'
									className='btn btn-primary'
								>
									{currentRubricId === 0
										? 'Save Rubric'
										: 'Save Changes'}
								</button>
							</center>
							{currentRubricId === 0 ? (
								<></>
							) : (
								<center>
									<button
										onClick={handleBack}
										type='submit'
										id='rubric-btn'
										className='btn btn-primary'
									>
										Go Back Without Saving
									</button>
								</center>
							)}
							{currentRubricId === 0 ? (
								<></>
							) : (
								<center>
									<button
										onClick={() => {
											setCurrentRubricId(0);
											history.push(
												'/create-edit-rubric/*',
											);
											setRubricData({
												title: '',
												columnHeads: [],
												rowHeads: [],
												cells: [],
											});
										}}
										type='submit'
										id='rubric-btn'
										className='btn btn-primary'
									>
										Create New Rubric
									</button>
								</center>
							)}
						</>
					) : (
						<p>Fill in form above to generate table.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default CreateRubric;
