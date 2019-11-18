import Task from "../models/task.model";
import { GenericObject } from "../utils/types";

export class TaskApiService {
	listing(queryParams: GenericObject = {}) {
		return Task.find(queryParams).sort('-createdAt');
	}
}
