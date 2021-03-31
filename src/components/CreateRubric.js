import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRubric } from '../actions/users';

function CreateRubric({ currentUser }) {
	const dispatch = useDispatch();

	const rubricCells = [];

	const [addRubric, setAddRubric] = useState([
		{
			dateCreated: new Date(),
			title: 'Title',
			columns: [],
			rows: [],
			desc: [],
		},
	]);

	var cells = document.getElementsByName('desc');
	const data = () => {
		cells.forEach((cell) => {
			rubricCells.push(cell.value);
		});
	};

	//this function will eventually save rubric to DB
	const handleSave = (e) => {
		e.preventDefault();
		data();
		console.log(rubricCells);
		setAddRubric({ ...addRubric, desc: rubricCells });
		//dispatch(createRubric(addRubric));
	};

	console.log(addRubric);
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
							value={addRubric.title}
							onChange={(e) =>
								setAddRubric({
									...addRubric,
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
							value={addRubric.columns}
							onChange={(e) =>
								setAddRubric({
									...addRubric,
									columns: e.target.value.split(','),
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
							value={addRubric.rows}
							onChange={(e) =>
								setAddRubric({
									...addRubric,
									rows: e.target.value.split(','),
								})
							}
						></input>
					</div>
				</form>
				<hr />
				<div className='table-container'>
					{addRubric === true ? ( //change this line if shows undefined, hope this will be resolved once login is implemented
						<>
							<h4 className='rubric-title2'>{addRubric.title}</h4>
							<table className='table'>
								<thead className='thead-light'>
									<tr>
										<th className='rubric-heading'></th>
										{addRubric.columns.map((col, key) => {
											return (
												<th
													className='rubric-heading'
													key={key}
													scope='col'
												>
													{col}
												</th>
											);
										})}
									</tr>
								</thead>
								<tbody>
									{addRubric.rows.map((row, key) => {
										return (
											<tr key={key}>
												<th scope='row'>{row}</th>
												{addRubric.columns.map(
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
																	maxLength='150'
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
