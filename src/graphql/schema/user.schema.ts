import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export default class User {
	@Field(type => ID)
	id: string;

	@Field()
	email: string;

	@Field({ nullable: true})
	password: string;
}
