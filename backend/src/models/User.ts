import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string,
    email: string,
    password: string
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default model<IUser>("User", UserSchema);