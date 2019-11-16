const Task = require('../../models/task');
const jwt = require('jsonwebtoken');

module.exports = {
	tasks: args => {
		return Task.find({ createdBy: args.userId }).sort('-createdAt');
	},
	task: args => {
		return Task.findById(args.taskId);
	},
	createTask: (args, request) => {
		const task = new Task({
			title: args.taskInput.title,
			description: args.taskInput.description,
			isDone: false,
			createdBy: request.userId
		});

		return task.save();
	},
	updateTask: args => {
		let data = {
			title: args.taskInput.title,
			description: args.taskInput.description,
		};

		return Task.findByIdAndUpdate(args.taskId, data, (error, task) => {
			return task;
		});
	},
	deleteTask: args => {
		return Task.findByIdAndDelete(args.taskId);
	},
	toggleTaskCompletion: args => {
		return Task.findByIdAndUpdate(args.taskId, { $set: { isDone: !args.isDone } }, { new: true });
	}
};
