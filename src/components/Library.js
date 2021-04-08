import React from 'react';
import { deleteFile, deleteRubric } from '../api';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Library({ rubrics, files }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));
	console.log(user);
	console.log(rubrics);
	console.log(files);

	const handleViewEdit = () => {
		history.push('/view-edit-rubric');
	};
	const handleGrade = () => {};

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
					{rubrics.length < 1 ? (
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
						rubrics.map((rubric, key) => {
							const date = rubric.createdAt.split('T');
							return (
								<tbody key={key}>
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
													onClick={handleViewEdit}
													type='submit'
													id='view-edit-btn'
													className='btn btn-primary'
												>
													View/Edit
												</button>
												<button
													onClick={() =>
														dispatch(
															deleteRubric(
																rubric._id,
															),
														)
													}
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
					{files.length < 1 ? (
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
						files.map((file, key) => {
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
											{file.currentGrade}
										</td>
										<td className='file-options'>
											<center>
												<button
													onClick={handleGrade}
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
