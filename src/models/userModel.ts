import { Schema, model } from 'mongoose';

interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  resgisteredDate?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    resgisteredDate: {
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

const User = model<IUser>('User', userSchema);

export { User, IUser };
