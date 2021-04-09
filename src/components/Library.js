import React from 'react';
import { deleteRubric } from '../actions/rubrics';
import { deleteFile } from '../actions/files';
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
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));

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
	console.log(files);
	console.log(thisUsersFiles);

	const handleGrade = () => {
		history.push('/grade');
	};

	//EVENTUALLY ALLOW USER TO CREATE FOLDERS TO GROUP FILES

	return (
		<div className='page-container'>
			<div className='library-container'>
				<h1>{user.result.name}'s Library</h1>
				<h4>Your Rubrics</h4>
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
									<th className='file-head' scope='row'></th>
									<td className='filename'>
										No Rubrics Yet - create rubrics on the
										Rubric Builder page.
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
										<th className='file-head' scope='row'>
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
				<hr />
				<h4>Previous Uploads</h4>
				<p>Date of Upload/Folder Name</p>
				<table className='table table-hover'>
					<thead className='thead-light'>
						<tr>
							<th className='file-head' scope='col'>
								Date Uploaded
							</th>
							<th className='file-head' scope='col'>
								Files
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
									<th className='file-head' scope='row'></th>
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
							return (
								<tbody>
									<tr key={key}>
										<th className='file-head' scope='row'>
											{file.dateUploaded}
										</th>
										<td className='filename'>
											<a href='#'>
												Download: {file.filename}
											</a>
										</td>
										<td className='filename'>
											{file.currentGrade === ''
												? 'Not yet graded'
												: file.currentGrade + '%'}
										</td>
										<td className='file-options'>
											<center>
												<button
													onClick={() => {
														setCurrentFileId(
															file.id,
														);
														history.push(
															`/grade/${currentFileId}`,
														);
													}}
													type='submit'
													id='view-edit-btn'
													className='btn btn-primary'
												>
													Grade/Re-grade
												</button>
												<button
													onClick={() => {
														dispatch(
															deleteFile(
																file._id,
															),
														);
														alert(
															'File deleted successfully',
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
				<hr />
			</div>
		</div>
	);
}

export default Library;
