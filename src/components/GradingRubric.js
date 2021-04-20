import React from 'react';

function GradingRubric({ thisUsersRubrics, currentRubricId, handleGrade }) {
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
									(col, key, e) => {
										index++;
										return (
											<td
												name='cell'
												key={key}
												id='cell'
												className='text-center'
												onClick={(e) => {
													const c = e.target.closest(
														'td',
													);
													const r = c.parentElement;
													handleGrade(c, r, col, row);
												}}
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
