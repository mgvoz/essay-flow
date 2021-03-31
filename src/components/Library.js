import React from 'react';

//import { Link } from 'react-router-dom';

function Library({ currentUser, setCurrentUser }) {
	return (
		<div className='page-container'>
			<div className='library-container'>
				<h1>{currentUser.nameOfUser}'s Library</h1>
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
					<tbody>
						<tr>
							{currentUser.length > 1 ? ( //add specific logic for id of user
								<>
									<th className='file-head' scope='row'>
										No Rubrics Yet
									</th>
									<td className='filename'></td>
									<td className='filename'></td>
								</>
							) : (
								//add map function to display all rubrics
								<>
									<th className='file-head' scope='row'>
										(date)
									</th>
									<td className='filename'>rubric name</td>
									<td className='filename'>
										<a href='#'>View/Edit</a>
									</td>
								</>
							)}
						</tr>
					</tbody>
				</table>
				<hr />
				<h4>Previous Uploads</h4>
				<p>generate small table for each upload</p>
				<p>Date of Upload</p>
				<table className='table table-hover'>
					<thead className='thead-light'>
						<tr>
							<th className='file-head' scope='col'>
								#
							</th>
							<th className='file-head' scope='col'>
								Files
							</th>
							<th className='file-head' scope='col'></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{currentUser.length > 1 ? ( //add specific logic for id of user
								<>
									<th className='file-head' scope='row'>
										No Files Yet
									</th>
									<td className='filename'></td>
									<td className='filename'></td>
								</>
							) : (
								//add map function to display all files
								<>
									<th className='file-head' scope='row'>
										1
									</th>
									<td className='filename'>
										clickable filename for download
									</td>
									<td className='file-options'>
										<a href='#'>Grade</a>
									</td>
								</>
							)}
						</tr>
					</tbody>
				</table>
				<hr />
			</div>
		</div>
	);
}

export default Library;
