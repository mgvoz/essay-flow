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
	//EVENTUALLY ALLOW USER TO CREATE FOLDERS TO GROUP FILES

	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));
	const [studentName, setStudentName] = useState('');

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
			user?.result?.googleId === file?.metadata?.userId ||
			user?.result?._id === file?.metadata?.userId,
	);

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
														file.filename
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
													<form
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
/*{fileArr.length < 1 ? (
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
							fileArr.map((file) => {
								const date = file.uploadDate.split('T');
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
														file.filename
													}
												>
													Download: {file.filename}
												</a>
											</td>
											<td className='filename'>
												<form
													onSubmit={saveStudentName}
												>
													<input
														type='text'
														name='studentName'
														placeholder={
															file.student !== ''
																? file.student
																: 'Enter student name'
														}
														value={
															studentName || ''
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
													<form
														method='DELETE'
														action='http://localhost:5000/files/${file._id}'
													>
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
													</form>
												</center>
											</td>
										</tr>
									</tbody>
								);
							})
						)}









{
							thisUsersFiles files.length < 1 ? (
								<>
									<tbody>
										<tr>
											<th
												className='file-head'
												scope='row'
											></th>
											<td className='filename'>
												No Files Yet - upload essays on
												the Upload page.
											</td>
											<td className='filename'></td>
										</tr>
									</tbody>
								</>
							) : (
								thisUsersFiles.map((file) => {
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
														href={
															'http://localhost:5000/files/essay/' +
															file.filename
														}
													>
														Download:{' '}
														{/*file.file.name}
													</a>
												</td>
												<td className='filename'>
													<form
														onSubmit={
															saveStudentName
														}
													>
														<input
															type='text'
															name='studentName'
															placeholder={
																file.student !==
																''
																	? file.student
																	: 'Enter student name'
															}
															value={
																studentName ||
																''
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
												</td>
												<td className='filename'>
													{file.currentGrade === false
														? 'Not yet graded'
														: file.currentGrade +
														  '%'}
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
														<form method='DELETE' action='http://localhost:5000/files/${file._id}'>
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
														</form>
													</center>
												</td>
											</tr>
										</tbody>
									);
								})
							)
						}*/
