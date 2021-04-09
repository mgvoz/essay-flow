import React from 'react';

export default function Grade({
	currentRubricId,
	setCurrentRubricId,
	currentFileId,
	setCurrentFileId,
	rubrics,
	files,
}) {
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

	//add inputs for notes and grade
	return <div>grade</div>;
}
