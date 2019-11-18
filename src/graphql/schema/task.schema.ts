import { Field, ObjectType, ID, ArgsType } from "type-graphql";
import User from "./user.schema";

@ObjectType()
export class Task {
	@Field(type => ID)
	id: string;

	@Field()
	title: string;

	@Field({ nullable: true})
	description?: string;

	@Field()
	isDone: boolean;

	@Field()
	finishedAt: string;

	@Field()
	createdAt: string;

	@Field(type => User)
	createdBy: User;
}

@ArgsType()
export class TasksArgs {
	@Field(type => ID)
	userId: string;
}
