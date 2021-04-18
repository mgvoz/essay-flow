import React, { useState } from 'react';

function GradingRubric({
	thisUsersRubrics,
	currentRubricId,
	rubricSelections,
	setRubricSelections,
	grade,
	setGrade,
}) {
	const currentRubric = thisUsersRubrics.filter(
		(f) => f._id === currentRubricId,
	);
	const [selected, setSelected] = useState('');

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
												name='cell'
												key={key}
												id='cell'
												className='text-center'
												onClick={(e) => {
													const c = e.target.closest(
														'td',
													);
													const r = c.parentElement;
													console.log(col);
													c.style =
														'border: 2px solid #2dac6d';
													setRubricSelections([
														...rubricSelections,
														row +
															': ' +
															c.innerHTML +
															' - ' +
															col +
															' points',
													]);

													//add logic to add and subtract points and unselect cell border
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
/*<input
													className='rubric-checkbox'
													id='myCheck'
													type='checkbox'
												/>*/
