import "reflect-metadata";

import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as mount from 'koa-mount';
import * as bodyParser from 'koa-bodyparser';
import { buildSchema } from 'type-graphql';
import TaskResolver from "./graphql/resolvers/task.resolver";

const graphqlHTTP = require('koa-graphql');

const todoApp = async () => {
	const app = new Koa();

	const resolver = buildSchema({
		resolvers: [TaskResolver]
	});

	app.use(bodyParser());

	app.use(mount('/', graphqlHTTP({
		schema: null,
		rootValue: null,
		graphiql: true
	})));

	mongoose.connect(
		`mongodb+srv://${ process.env.db_user }:${
			process.env.db_password
		}@to-do-list-fwj7v.mongodb.net/${ process.env.db_name }?retryWrites=true&w=majority`
		)
		.then(() => {
			app.listen(4200);
		})
		.catch(err => {
			console.log(err);
		}
	);
}

todoApp();
