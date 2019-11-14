const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Task {
	_id: ID!
	title: String!
	description: String!
	createdAt: String!
}

type User {
	_id: ID!
	email: String!
	password: String
}

type AuthData {
	userId: ID!
	token: String!
	tokenExpiration: Int!
}

input TaskInput {
	title: String!
	description: String!
}

input UserInput {
	email: String!
	password: String!
}

type RootQuery {
	login(email: String!, password: String!): AuthData!
	tasks: [Task!]!
	task(taskId: ID!): Task
}

type RootMutation {
	createUser(userInput: UserInput): User

	createTask(taskInput: TaskInput): Task
	updateTask(taskId: ID!, taskInput: TaskInput): Task
	deleteTask(taskId: ID!): Task
}

schema {
	query: RootQuery
	mutation: RootMutation
}
`);
