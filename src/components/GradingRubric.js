import React from 'react';

function GradingRubric({ thisUsersRubrics, currentRubricId }) {
	const currentRubric = thisUsersRubrics.filter(
		(f) => f._id === currentRubricId,
	);
	let index = -1;

	return (
		<div className='table-responsive'>
			<table className='table table-bordered'>
				<thead className='thead-light'>
					<tr>
						<th className='rubric-heading'></th>
						{currentRubric[0].columnHeads.map((col, key) => {
							return (
								<th
									className='rubric-heading'
									key={key}
									scope='col'
								>
									{col}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{currentRubric[0].rowHeads.map((row, key) => {
						return (
							<tr key={key}>
								<th className='rubric-heading' scope='row'>
									{row}
								</th>
								{currentRubric[0].columnHeads.map(
									(col, key) => {
										index++;
										return (
											<td
												key={key}
												id='test'
												className='text-center'
											>
												{currentRubric[0].cells[index]}
											</td>
										);
									},
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default GradingRubric;

/*<textarea
													className='cells'
													name='desc'
													id='desc'
													cols='auto'
													rows='auto'
													placeholder='Click here to add description'
													value={
														currentRubric[0].cells[
															index
														]
													}
													//onChange={data}
												></textarea>*/
