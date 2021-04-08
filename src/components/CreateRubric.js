import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRubric, updateRubric } from '../actions/rubrics';

function CreateRubric({ currentId, setCurrentId }) {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));

	const [rubricData, setRubricData] = useState({
		title: '',
		columnHeads: [],
		rowHeads: [],
		cells: [],
	});

	const clear = () => {
		setCurrentId(0);
		setRubricData({ title: '', columnHeads: [], rowHeads: [], cells: [] });
	};

	const rubricCells = [];

	var cellData = document.getElementsByName('desc');
	const data = () => {
		cellData.forEach((cell) => {
			rubricCells.push(cell.value);
		});
	};

	const handleSave = async (e) => {
		e.preventDefault();
		await data();
		if (currentId === 0) {
			dispatch(createRubric({ ...rubricData, name: user?.result?.name }));
			clear();
			alert('Rubric added successfully and is viewable in your Library!');
		} else {
			dispatch(
				updateRubric(currentId, {
					...rubricData,
					name: user?.result?.name,
				}),
			);
			clear();
		}
	};

	console.log(user);
	console.log(rubricData);

	return (
		<div className='page-container'>
			<div className='rubric-container'>
				<h1>Create New Rubric</h1>
				<form>
					<div className='form-group'>
						<label htmlFor='rubric-title'>Rubric Title</label>
						<input
							type='text'
							className='form-control'
							placeholder='Research Paper Assignment'
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
							point values separated by commas (6 maximum):
						</label>
						<input
							type='text'
							className='form-control'
							placeholder='10pts., 20pts.'
							maxLength='25'
							value={rubricData.columns}
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
							placeholder='Accuracy, Organization, Conventions'
							value={rubricData.rows}
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
					{rubricData !== true ? ( //change this line if shows undefined
						<>
							<h4 className='rubric-title2'>
								{rubricData.title}
							</h4>
							<table className='table'>
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
												<th scope='row'>{row}</th>
												{rubricData.columnHeads.map(
													(col, key) => {
														return (
															<td
																key={key}
																id='test'
															>
																<textarea
																	name='desc'
																	id='desc'
																	cols='auto'
																	rows='auto'
																	maxLength='300'
																	placeholder='Click here to add description'
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
							<center>
								<button
									onClick={handleSave}
									type='submit'
									id='rubric-btn'
									className='btn btn-primary'
								>
									Save Rubric
								</button>
							</center>
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
