const Task = require('../../models/task');

module.exports = {
	tasks: () => {
		return Task.find().sort('-createdAt')
			.then(res => {
				return res.map(task => {
					return { ...task._doc };
				});
			}).catch(err => {
				throw err;
			});
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

		return task.save()
			.then(res => {
				return { ...res._doc };
			}).catch(err => {
				console.log(err);
				throw err;
			});
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
