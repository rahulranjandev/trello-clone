import { Schema, model } from 'mongoose';

interface ITask {
  _id?: string;
  taskBoardId: Schema.Types.ObjectId;
  name: string;
  description: string;
  tags: string[];
  dueDate: Date;
  assignee: Schema.Types.ObjectId[];
  createdAt?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    taskBoardId: {
      type: Schema.Types.ObjectId,
      ref: 'TaskBoard',
      required: [true, 'Please add a task board ID'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name for the task'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description for the task'],
    },
    tags: {
      type: [String],
      default: [],
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date for the task'],
    },
    assignee: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

const Task = model<ITask>('Task', taskSchema);

export { Task, ITask };
