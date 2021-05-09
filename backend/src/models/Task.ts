import {Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
    title: string,
    description: string,
    userId: string
}

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default model<ITask>('Task', TaskSchema);