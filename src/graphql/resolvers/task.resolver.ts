import { Resolver, Authorized, Mutation, Arg, Ctx, Query, Args } from "type-graphql";
import { Task, TasksArgs } from "../schema/task.schema";
import { TaskApiService } from "../../services/task-api.service";

@Resolver(Task)
export default class TaskResolver {
	constructor(private taskApiService: TaskApiService) {}

	@Query(returns => [Task])
	recipes(@Args() { userId }: TasksArgs) {
		return this.taskApiService.listing({
			createdBy: userId
		});
	}
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
