import mongoose from 'mongoose';
import fileData from '../models/fileData.js';

export const getFileData = async (req, res) => {
	try {
		const filedata = await fileData.find();
		res.status(200).json(filedata);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

/*export const getFileData = async (req, res) => {
	const { id } = req.params;
	try {
		const filedata = await fileData.findById(id);
		res.status(200).json(filedata);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};*/

export const createFileData = async (req, res) => {
	const data = req.body;
	const newData = new fileData({
		...data,
		userId: req.userId,
	});
	try {
		await newData.save();
		res.status(201).json(newData);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updateFileData = async (req, res) => {
	const { id } = req.params;
	const {
		userName,
		lastUpdated,
		fileId,
		timeSpentGrading,
		student,
		currentGrade,
		notes,
		filename,
		userId,
	} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No data with id: ${id}`);

	const updatedData = {
		userName,
		lastUpdated,
		fileId,
		timeSpentGrading,
		student,
		currentGrade,
		notes,
		filename,
		userId,
		_id: id,
	};
	await fileData.findByIdAndUpdate(id, updatedData, { new: true });
	res.json(updatedData);
};

export const deleteFileData = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No data with id: ${id}`);

	await fileData.findByIdAndRemove(id);

	res.json({ message: 'File data deleted successfully.' });
};
