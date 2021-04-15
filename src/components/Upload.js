import React, { useState } from 'react';

function Upload({ files }) {
	const [fileName, setFileName] = useState('');
	const user = JSON.parse(localStorage.getItem('profile'));

	return (
		<div className='page-container'>
			<div className='upload-container'>
				<h1 className='upload-heading'>File Upload</h1>
				<form
					action='http://localhost:5000/files/upload'
					method='POST'
					encType='multipart/form-data'
				>
					<div className='custom-file'>
						<input
							type='file'
							name='file'
							className='custom-file-input'
							accept='application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx, .pages'
							required
							autoFocus
							onChange={(e) => {
								setFileName(e.target.value.toString());
							}}
						/>
						<label className='custom-file-label' htmlFor='file'>
							{fileName === ''
								? ''
								: fileName.replace('C:\\fakepath\\', '')}
						</label>
					</div>
					<center>
						<input
							type='submit'
							value='Upload File'
							className='btn btn-sm btn-primary'
							id='js-upload-submit'
							onClick={() => {
								document.cookie = `userName = ${user.result.name}; path=/`;
								document.cookie = `userId = ${
									user.result._id || user.result.googleId
								}; path=/`;
								document.cookie = `student = ""; path=/`;
								document.cookie = `currentGrade = 0; path=/`;
								document.cookie = `notes = []; path=/`;
								alert('File uploaded successfully.');
							}}
						/>
					</center>
				</form>
				<p className='upload-desc'>
					All uploaded files can be found in your Library.
				</p>
			</div>
		</div>
	);
}

export default Upload;

/*<div className='upload-dropzone' {...getRootProps()}>
						<input type='file' name='file' {...getInputProps()} />
						<p>
							Drag 'n' drop some files here, or click to select
							files.
						</p>
					</div>
					<p className='file-types-text'>
						(.pdf, .doc, .docx, .pages files only)
					</p>*/

/*<div className='attached-files-container'>
						<h5 className='file-list-heading'>Attached File(s):</h5>
						<div className='attached-files'>
							{fileList.map((file) => (
								<p key={file.path}>{file.name}</p>
							))}
						</div>
					</div>
					<div className='attached-files-container'>
						<h5 className='file-list-heading'>Rejected File(s):</h5>
						<div className='attached-files'>
							{badFileList.map((file) => {
								return (
									<p key={file.file.path}>{file.file.name}</p>
								);
							})}
						</div>
					</div>*/

/*<form
					action='http://localhost:5000/files/upload'
					method='POST'
					encType='multipart/form-data'
				>
					<div className='custom-file mb-3'>
						<input
							type='file'
							name='file'
							id='file'
							className='custom-file-input'
						/>
						<label for='file' className='custom-file-label'>
							Choose File
						</label>
					</div>
					<input
						type='submit'
						value='Submit'
						className='btn btn-primary btn-block'
					/>
				</form>*/

/*<div className='upload-dropzone' {...getRootProps()}>
					<input {...getInputProps()} />
					<p>
						Drag 'n' drop some files here, or click to select files.
					</p>
				</div>
				<p className='file-types-text'>
					(.pdf, .doc, .docx, .pages files only)
				</p>*/

/*<h4 className='single-upload'>Single file</h4>
				<div className='input-group mb-3'>
					<div className='custom-file'>
						<input
							type='file'
							className='custom-file-input'
							id='inputGroupFile02'
							multiple
						/>
						<label
							className='custom-file-label'
							htmlFor='inputGroupFile02'
						>
							Choose file
						</label>
					</div>
					<div className='input-group-append'>
						<span className='input-group-text' id=''>
							Upload
						</span>
					</div>
				</div>
				<div className='multiple-upload-container'>
					<div className='panel panel-default'>
						<div className='panel-body'>
							<form
								action=''
								method='post'
								encType='multipart/form-data'
								id='js-upload-form'
							></form>
							<h4 className='multiple-heading'>
								Or drag and drop files below
							</h4>
							<div className='upload-drop-zone' id='drop-zone'>
								Just drag and drop files here
							</div>
							<div className='js-upload-finished'>
								<h5>Attached files</h5>
								<div className='list-group'>
									<a
										href='#'
										className='list-group-item list-group-item-success'
									>
										<span className='badge alert-success pull-right'>
											Success
										</span>
										image-01.jpg
									</a>
									<a
										href='#'
										className='list-group-item list-group-item-success'
									>
										<span className='badge alert-success pull-right'>
											Success
										</span>
										image-02.jpg
									</a>
								</div>
							</div>
						</div>
					</div>*/
