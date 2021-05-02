import mongoose from 'mongoose';
import Rubric from '../models/rubric.js';

export const getRubrics = async (req, res) => {
	try {
		const rubrics = await Rubric.find();
		res.status(200).json(rubrics);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getRubric = async (req, res) => {
	const { id } = req.params;
	try {
		const rubric = await Rubric.findById(id);
		res.status(200).json(rubric);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createRubric = async (req, res) => {
	const rubric = req.body;
	const newRubric = new Rubric({
		...rubric,
		creator: req.userId,
		createdAt: new Date().toDateString(),
	});
	try {
		await newRubric.save();
		res.status(201).json(newRubric);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateRubric = async (req, res) => {
	const { id } = req.params;
	const { title, creator, columnHeads, rowHeads, cells } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No rubric with id: ${id}`);

	const updatedRubric = {
		title,
		creator,
		columnHeads,
		rowHeads,
		cells,
		_id: id,
	};
	await Rubric.findByIdAndUpdate(id, updatedRubric, { new: true });
	res.json(updatedRubric);
};

export const deleteRubric = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No rubric with id: ${id}`);

	await Rubric.findByIdAndRemove(id);

	res.json({ message: 'Rubric deleted successfully.' });
};
