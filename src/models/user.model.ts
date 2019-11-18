import mongoose, { Schema, Document } from 'mongoose';

export interface UserDetails extends Document {
	email: string;
	password: string;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

export default mongoose.model<UserDetails>('User', UserSchema);
