import React, { useState } from 'react';
import { deleteRubric } from '../actions/rubrics';
import { deleteFile } from '../actions/files';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateFile } from '../actions/files';
import { FETCH_ALL_FILES } from '../constants/actionTypes';

function Library({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [studentName, setStudentName] = useState('');

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
	const currentFile = useSelector((state) =>
		currentFileId ? state.files.find((f) => f._id === currentFileId) : null,
	);

	const saveStudentName = (e) => {
		e.preventDefault();
		dispatch(
			updateFile(currentFileId, {
				...currentFile,
				student: studentName,
			}),
		);
		window.location.reload();
	};

	//console.log(thisUsersFiles);
	console.log(studentName);
	console.log(currentFileId);
	console.log(currentFile);
	//EVENTUALLY ALLOW USER TO CREATE FOLDERS TO GROUP FILES

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
				<h4>Previous Uploads</h4>
				<div className='table-responsive'>
					<table className='table table-hover'>
						<thead className='thead-light'>
							<tr>
								<th className='file-head' scope='col'>
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
						{thisUsersFiles.length < 1 ? (
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
							thisUsersFiles.map((file, key) => {
								const date = file.dateUploaded.split('T');
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
													href='#'
												>
													Download:{' '}
													{/*file.file.name*/}
												</a>
											</td>
											<td className='filename'>
												<form
													onSubmit={saveStudentName}
												>
													<input
														type='text'
														placeholder={
															file.student !== ''
																? file.student
																: 'Enter student name'
														}
														value={studentName}
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
													>
														Save
													</button>
												</form>
											</td>
											<td className='filename'>
												{file.currentGrade === false
													? 'Not yet graded'
													: file.currentGrade + '%'}
											</td>
											<td className='file-options'>
												<center>
													<button
														onClick={() => {
															setCurrentFileId(
																file._id,
															);
															history.push(
																`/grade/${currentFileId}`,
															);
														}}
														type='submit'
														id='view-edit-btn'
														className='btn btn-primary'
													>
														Grade/Re-Grade
													</button>
													<button
														onClick={() => {
															dispatch(
																deleteFile(
																	file._id,
																),
															);
															window.location.reload();
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
			</div>
		</div>
	);
}

export default Library;
