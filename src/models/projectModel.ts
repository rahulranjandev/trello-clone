import { Schema, model } from 'mongoose';

interface IProject {
  _id?: string;
  name: string;
  description: string;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Please add a name for the project'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description for the project'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const Project = model<IProject>('Project', projectSchema);

export { Project, IProject };
