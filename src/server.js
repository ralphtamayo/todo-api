const Koa = require('koa');
const Router = require('@koa/router');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const jwt = require('jsonwebtoken');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())
;

app.use((ctx, next) => {
	const authHeader = ctx.get('Authorization');

	if (!authHeader) {
		ctx.isAuth = false;
		return next();
	}

	const token = authHeader.split(' ')[1];

	if (!token || token === '') {
		ctx.isAuth = false;

		return next();
	}

	let decodedToken;

	try {
		decodedToken = jwt.verify(token, 'somesupersecretkey');
	} catch (err) {
		ctx.isAuth = false;

		return next();
	}

	if (!decodedToken) {
		ctx.isAuth = false;

		return next();
	}

	ctx.isAuth = true;
	ctx.userId = decodedToken.userId;

	next();
});

app.use(mount('/', graphqlHTTP({
	schema: graphQlSchema,
	rootValue: graphQlResolvers,
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
