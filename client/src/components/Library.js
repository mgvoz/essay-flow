import React, { useState } from 'react';
import { deleteRubric } from '../actions/rubrics';
import {
	createFileData,
	updateFileData,
	deleteFileData,
} from '../actions/filedata';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Library({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
	fileData,
}) {
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
			user?.result?.googleId === file?.metadata ||
			user?.result?._id === file?.metadata,
	);

	//access only signed-in user's file data
	const thisUsersFileData = fileData.filter(
		(data) =>
			user?.result?.googleId === data?.userId ||
			user?.result?._id === data?.userId,
	);

	//toggling collapse row for feedback
	const [expanded, setExpanded] = useState(0);
	const displayFeedback = thisUsersFileData.filter(
		(d) => d.fileId === expanded,
	)[0];

	//get all data for current file selected with ID
	const currentFile = thisUsersFiles.filter((f) => f._id === currentFileId);

	//function to assign/update student name for a particular file
	const saveName = () => {
		const match = thisUsersFileData.filter(
			(d) => d.fileId === currentFileId,
		)[0];
		if (match) {
			dispatch(
				updateFileData(match._id, {
					...match,
					student: studentName,
				}),
			);
		} else {
			dispatch(
				createFileData({
					student: studentName,
					lastUpdated: new Date(),
					userName: user?.result?.name,
					fileId: currentFileId,
					currentGrade: 'Not yet graded.',
					notes: '',
					timeSpentGrading: '',
					filename: currentFile[0].filename,
				}),
			);
		}
	};

	//function to control grade button
	const gradeButton = (file) => {
		const match = thisUsersFileData.filter(
			(d) => d.fileId === currentFileId,
		)[0];
		if (match) {
			history.push('/grade/' + file._id);
		} else {
			alert('Please enter student name before grading.');
		}
	};

	//delete file data when file is deleted
	const deleteExtraData = () => {
		const match = thisUsersFileData.filter(
			(d) => d.fileId === currentFileId,
		)[0];
		if (match) {
			dispatch(deleteFileData(match._id));
		}
	};

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
									<center>Title</center>
								</th>
								<th className='file-head' scope='col'>
									<center>Options</center>
								</th>
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
												<center>{rubric.title}</center>
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
									<center>File</center>
								</th>
								<th className='file-head' scope='col'>
									<center>Student</center>
								</th>
								<th className='file-head' scope='col'>
									<center>Current Score</center>
								</th>
								<th className='file-head' scope='col'>
									<center>Options</center>
								</th>
							</tr>
						</thead>
						{thisUsersFiles[0] === 'No files available' ||
						thisUsersFiles.length === 0 ? (
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
												<center>{file.filename}</center>
											</td>
											<td className='filename'>
												<center>
													<form onSubmit={saveName}>
														<input
															type='text'
															placeholder={
																thisUsersFileData.find(
																	(d) =>
																		d.fileId ===
																		file._id,
																)
																	? thisUsersFileData.find(
																			(
																				d,
																			) =>
																				d.fileId ===
																				file._id,
																	  ).student
																	: 'Enter student name'
															}
															onChange={(e) => {
																setCurrentFileId(
																	file._id,
																);
																setStudentName(
																	e.target
																		.value,
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
												</center>
											</td>
											<td className='filename'>
												<center>
													{thisUsersFileData.find(
														(d) =>
															d.fileId ===
															file._id,
													)?.currentGrade ===
														'Not yet graded.' ||
													thisUsersFileData.find(
														(d) =>
															d.fileId ===
															file._id,
													) === undefined
														? 'Not yet graded'
														: thisUsersFileData.find(
																(d) =>
																	d.fileId ===
																	file._id,
														  )?.currentGrade}
												</center>
											</td>
											<td
												className='file-options'
												id='parent'
											>
												<center>
													<form
														className='grade-delete'
														onSubmit={(e) => {
															e.preventDefault();
															setTimeout(
																gradeButton(
																	file,
																),
																3000,
															);
														}}
													>
														<button
															type='submit'
															id='view-edit-btn'
															className='btn btn-primary'
															onMouseEnter={() =>
																setCurrentFileId(
																	file._id,
																)
															}
															onMouseLeave={() =>
																setCurrentFileId(
																	0,
																)
															}
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
															'https://essay-flow.xyz/files/' +
															file._id +
															'?_method=DELETE'
														}
													>
														<button
															type='submit'
															id='view-edit-btn'
															className='btn btn-primary'
															onMouseEnter={() =>
																setCurrentFileId(
																	file._id,
																)
															}
															onClick={
																deleteExtraData
															}
															onMouseLeave={() =>
																setCurrentFileId(
																	0,
																)
															}
														>
															Delete
														</button>
													</form>
												</center>
											</td>
										</tr>
										{file._id === expanded ? (
											<tr
												className='collapse'
												id={'collapseRow' + file._id}
												colSpan='5'
											>
												<td colSpan='5'>
													{displayFeedback ===
														undefined ||
													displayFeedback?.notes ===
														''
														? 'No feedback entered yet.'
														: displayFeedback.notes}
												</td>
											</tr>
										) : null}
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
