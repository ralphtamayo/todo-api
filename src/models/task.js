const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	isDone: { type: Boolean, default: false },
	finishedAt: { type: Date },
	createdAt: { type: Date, default: Date.now },
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
