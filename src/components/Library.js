import React, { useState } from 'react';
import { deleteRubric } from '../actions/rubrics';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Library({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
}) {
	/*************************************/

	//FIND WAY TO ONLY DISPLAY FEEDBACK OF ONE ROW AT A TIME!!!!!!!!

	/*************************************/

	//set variables
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [studentName, setStudentName] = useState('');

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

	//state for toggling collapse row for feedback
	const [expanded, setExpanded] = useState(0);

	//get all data for current file selected with ID
	const currentFile = thisUsersFiles.filter((f) => f._id === expanded);

	return (
		<div className='page-container'>
			<div className='library-container'>
				<h1>{user.result.name}'s Library</h1>
				<h4>Your Rubrics</h4>
				<div className='table-responsive'>
					<table className='table table-hover'>
						<thead className='thead-light'>
							<tr>
								<th className='file-head' scope='col'>
									Date Created
								</th>
								<th className='file-head' scope='col'>
									Title
								</th>
								<th className='file-head' scope='col'></th>
							</tr>
						</thead>
						{thisUsersRubrics.length < 1 ? (
							<>
								<tbody>
									<tr>
										<th
											className='file-head'
											scope='row'
										></th>
										<td className='filename'>
											No Rubrics Yet - create rubrics on
											the Rubric Builder page.
										</td>
										<td className='filename'></td>
									</tr>
								</tbody>
							</>
						) : (
							thisUsersRubrics.map((rubric) => {
								const date = rubric.createdAt.split('T');
								return (
									<tbody key={rubric._id}>
										<tr>
											<th
												className='file-head'
												scope='row'
											>
												{date[0]}
											</th>
											<td className='filename'>
												{rubric.title}
											</td>
											<td className='filename'>
												<center>
													<button
														onClick={() => {
															setCurrentRubricId(
																rubric._id,
															);

															history.push(
																`/create-edit-rubric/${currentRubricId}`,
															);
														}}
														type='submit'
														id='view-edit-btn'
														className='btn btn-primary'
													>
														View/Edit
													</button>

													<button
														onClick={() => {
															dispatch(
																deleteRubric(
																	rubric._id,
																),
															);
														}}
														type='submit'
														id='view-edit-btn'
														className='btn btn-primary'
													>
														Delete
													</button>
												</center>
											</td>
										</tr>
									</tbody>
								);
							})
						)}
					</table>
				</div>
				<hr />
				<h4>Your Files</h4>
				<div className='table-responsive'>
					<table className='table table-hover'>
						<thead className='thead-light'>
							<tr>
								<th className='file-head ' scope='col'>
									Date Uploaded
								</th>
								<th className='file-head' scope='col'>
									File
								</th>
								<th className='file-head' scope='col'>
									Student
								</th>
								<th className='file-head' scope='col'>
									Current Grade
								</th>
								<th className='file-head' scope='col'></th>
							</tr>
						</thead>
						{thisUsersFiles[0] === 'No files available' ? (
							<>
								<tbody>
									<tr>
										<th
											className='file-head'
											scope='row'
										></th>
										<td className='filename'>
											No Files Yet - upload essays on the
											Upload page.
										</td>
										<td className='filename'></td>
									</tr>
								</tbody>
							</>
						) : (
							thisUsersFiles.map((file) => {
								const date = file?.uploadDate?.split('T');
								return (
									<tbody key={file._id}>
										<tr>
											<th
												className='file-head'
												scope='row'
											>
												{date[0]}
											</th>
											<td className='filename'>
												<a
													className='filename-link'
													href={
														'http://localhost:5000/files/essay/' +
														file._id
													}
												>
													Download: {file.filename}
												</a>
											</td>
											<td className='filename'>
												<form
													method='GET'
													action={
														'http://localhost:5000/files/student/' +
														currentFileId
													}
												>
													<input
														type='text'
														placeholder={
															file.metadata
																.student !== ''
																? file.metadata
																		.student
																: 'Enter student name'
														}
														onChange={(e) => {
															setCurrentFileId(
																file._id,
															);
															setStudentName(
																e.target.value,
															);
														}}
													></input>
													<button
														type='submit'
														id='view-edit-btn'
														className='btn btn-primary'
														onClick={() =>
															(document.cookie = `student = ${studentName}; path=/`)
														}
													>
														Save
													</button>
												</form>
											</td>
											<td className='filename'>
												{file.metadata.currentGrade ===
												'Not yet graded.'
													? 'Not yet graded'
													: file.metadata
															.currentGrade + '%'}
											</td>
											<td
												className='file-options'
												id='parent'
											>
												<form className='grade-delete'>
													<button
														onClick={() => {
															setCurrentFileId(
																file._id,
															);
															history.push(
																'/grade/' +
																	file._id,
															);
														}}
														type='submit'
														id='view-edit-btn'
														className='btn btn-primary'
													>
														Grade
													</button>
												</form>
												<form className='grade-delete'>
													<button
														type='button'
														className='btn btn-primary'
														id='view-edit-btn'
														data-toggle='collapse'
														data-target={
															'#collapseRow' +
															file._id
														}
														aria-expanded='false'
														aria-controls={
															'collapseRow' +
															file._id
														}
														onClick={() => {
															setExpanded(
																file._id,
															);
														}}
													>
														View Feedback
													</button>
												</form>
												<form
													className='grade-delete'
													method='POST'
													action={
														'http://localhost:5000/files/' +
														file._id +
														'?_method=DELETE'
													}
												>
													<button
														type='submit'
														id='view-edit-btn'
														className='btn btn-primary'
													>
														Delete
													</button>
												</form>
											</td>
										</tr>
										<tr
											className='collapse'
											id={'collapseRow' + file._id}
											colSpan='5'
										>
											<td colSpan='5'>
												{currentFile[0] === undefined
													? null
													: currentFile[0].metadata
															.notes === '[]'
													? 'No feedback entered yet.'
													: currentFile[0].metadata
															.notes}
											</td>
										</tr>
									</tbody>
								);
							})
						)}
					</table>
				</div>
				<hr />
			</div>
		</div>
	);
}

export default Library;
