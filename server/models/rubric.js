import mongoose from 'mongoose';

const rubricSchema = new mongoose.Schema({
	name: String,
	creator: String,
	createdAt: { type: Date, default: new Date() },
	title: String,
	columnHeads: Array,
	rowHeads: Array,
	cells: Array,
});

const Rubric = mongoose.model('Rubric', rubricSchema);

export default Rubric;
