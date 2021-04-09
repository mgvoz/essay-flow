import React, { useState, useEffect } from 'react';
import { addFile } from '../actions/files';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

function Upload() {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('profile'));

	const [fileData, setFileData] = useState([
		{
			name: user?.result?.name,
			file: 'File',
			currentGrade: '',
			notes: [],
		},
	]);

	const {
		acceptedFiles,
		fileRejections,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		multiple: true,
		accept:
			'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx, .pages',
	});

	const fileList = [];
	const badFileList = [];

	acceptedFiles.forEach((file) => {
		fileList.push(file);
	});
	fileRejections.forEach((file) => {
		badFileList.push(file);
	});

	const handleUpload = (e) => {
		e.preventDefault();
		fileList.forEach((file) => {
			setFileData({ ...fileData, file: file });
			dispatch(addFile(fileData));
		});

		alert('File(s) uploaded successfully!');
		history.push('/library');
	};

	console.log(fileData);
	console.log(fileList);
	console.log(badFileList);

	return (
		<div className='page-container'>
			<div className='upload-container'>
				<h1 className='upload-heading'>File Upload</h1>
				<div className='upload-dropzone' {...getRootProps()}>
					<input {...getInputProps()} />
					<p>
						Drag 'n' drop some files here, or click to select files.
					</p>
				</div>
				<p className='file-types-text'>
					(.pdf, .doc, .docx, .pages files only)
				</p>
				<div className='attached-files-container'>
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
							return <p key={file.file.path}>{file.file.name}</p>;
						})}
					</div>
				</div>
				<center>
					<button
						type='submit'
						className='btn btn-sm btn-primary'
						id='js-upload-submit'
						onClick={handleUpload}
					>
						Upload File(s)
					</button>
				</center>
				<p className='upload-desc'>
					All files can be found in your Library.
				</p>
			</div>
		</div>
	);
}

export default Upload;
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
