import React from 'react';

function Upload() {
	return (
		<div className='page-container'>
			<div className='upload-container'>
				<h1 className='upload-heading'>File Upload</h1>
				<h4 className='single-upload'>Single file</h4>
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
							for='inputGroupFile02'
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
								enctype='multipart/form-data'
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
					</div>
					<div className='form-inline'>
						<button
							type='submit'
							className='btn btn-sm btn-primary'
							id='js-upload-submit'
						>
							Upload files
						</button>
					</div>
				</div>
				<p className='upload-desc'>
					All files can be found in your Library.
				</p>
			</div>
		</div>
	);
}

export default Upload;
