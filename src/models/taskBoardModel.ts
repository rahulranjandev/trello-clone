import { Schema, model } from 'mongoose';

interface ITaskBoard {
  _id?: string;
  projectId: Schema.Types.ObjectId;
  name: string;
  tasks?: Schema.Types.ObjectId[];
  createdAt?: Date;
}

const taskBoardSchema = new Schema<ITaskBoard>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name for the task board'],
    },
    tasks: {
      type: [Schema.Types.ObjectId],
      ref: 'Task',
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

const TaskBoard = model<ITaskBoard>('TaskBoard', taskBoardSchema);

export { TaskBoard, ITaskBoard };
