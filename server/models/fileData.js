import mongoose from 'mongoose';

const fileDataSchema = new mongoose.Schema({
	userName: { type: String, default: '' },
	userId: String,
	lastUpdated: { type: Date, default: new Date() },
	fileId: { type: String, default: '' },
	timeSpentGrading: { type: String, default: '' },
	student: { type: String, default: '' },
	currentGrade: { type: String, default: 'Not yet graded.' },
	notes: { type: String, default: [] },
	filename: { type: String, default: '' },
});

const fileData = mongoose.model('fileData', fileDataSchema);

export default fileData;
