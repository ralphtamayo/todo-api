import { model, Schema, Document } from 'mongoose';
import { UserDetails } from './user.model';

export interface TaskDetails extends Document {
	title: string;
	description: string;
	isDone: boolean;
	finishedAt: Date;
	createdAt: Date;
	createdBy: UserDetails['_id'];
}

const TaskSchema: Schema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	isDone: { type: Boolean },
	finishedAt: { type: Date },
	createdAt: { type: Date, default: Date.now },
	createdBy: { type: Schema.Types.ObjectId, required: true }
});

export default model<TaskDetails>('Task', TaskSchema);
