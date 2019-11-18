import { Resolver, Authorized, Mutation, Arg, Ctx } from "type-graphql";
import User from "../schema/user.schema";

@Resolver(User)
export default class UserResolver {
	// @Mutation(returns => User)
	// @Authorized()
	// createUser(@Arg("newRecipeData") newRecipeData: NewRecipeInput): Promise<Recipe> {
	// 	return this.recipeService.addNew({ data: newRecipeData, user });
	// }

	// @Query(returns => Task, { nullable: true })
	// projectByName(@Arg("name") name: string): ProjectData | undefined {
	// 	return projects.find(project => project.name === name);
	// }

	// @FieldResolver()
	// tasks(@Root() projectData: ProjectData) {
	// 	return tasks.filter(task => {
	// 		return task.project_id === projectData.id;
	// 	});
	// }
}
