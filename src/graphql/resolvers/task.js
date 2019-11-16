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
		try {
			console.log(args);
			if (args.taskInput.title == '') {
				throw new Error('Title should not be blank.');
			}

			if (args.taskInput.description == '') {
				throw new Error('Description should not be blank.');
			}

			const task = new Task({
				title: args.taskInput.title,
				description: args.taskInput.description,
				isDone: false,
				createdBy: request.userId
			});

			return task.save();
		} catch (err) {
			throw err;
		}
	},
	updateTask: args => {
		try {
			if (args.taskInput.title == '') {
				throw new Error('Title should not be blank.');
			}

			if (args.taskInput.description == '') {
				throw new Error('Description should not be blank.');
			}

			let data = {
				title: args.taskInput.title,
				description: args.taskInput.description,
			};

			return Task.findByIdAndUpdate(args.taskId, data);
		} catch (err) {
			throw err;
		}
	},
	deleteTask: args => {
		return Task.findByIdAndDelete(args.taskId);
	},
	toggleTaskCompletion: args => {
		return Task.findByIdAndUpdate(args.taskId, { $set: { isDone: !args.isDone } }, { new: true });
	}
};
