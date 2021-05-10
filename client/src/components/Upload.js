import React, { useState } from 'react';

function Upload({ userID }) {
	//set variables
	const [fileName, setFileName] = useState('');
	const [display, setDisplay] = useState('none');

	return (
		<div className='page-container'>
			<div className='upload-container'>
				<h1 className='upload-heading'>File Upload</h1>
				<p className='pdf-only'>
					<em>(.pdf files only)</em>
				</p>
				<form
					action={'https://essay-flow.xyz/files/upload/' + userID}
					method='POST'
					encType='multipart/form-data'
					id='form-submit'
				>
					<div className='custom-file'>
						<input
							id='fileInput'
							type='file'
							name='inputFile'
							className='custom-file-input'
							accept='application/pdf'
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
								fileName && setDisplay('block');
							}}
						/>
					</center>
				</form>
				<p className='upload-desc'>
					All uploaded files can be found in your Library.
				</p>
			</div>
			<center>
				<div
					className='alert alert-success'
					style={{ display: display, maxWidth: '50vw' }}
				>
					File uploaded successfully!
				</div>
			</center>
		</div>
	);
}

export default Upload;
