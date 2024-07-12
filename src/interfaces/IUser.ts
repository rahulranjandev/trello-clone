import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IUser, User } from '@models/userModel';

export class UserService {
  /**
   * @description Get User Info
   * @Access Middleware access - Protected
   */
  public async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).lean().select('-password');
  }

  /**
   * @description Get User Info - Public Access
   * @Access User access
   */
  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email });
  }
  /**
   * @description Get User Info
   * @Access User access - Protected
   */
  public async getUserByQuery(query: FilterQuery<IUser>): Promise<IUser | null> {
    return await User.findOne(query as FilterQuery<IUser>).select('-password');
  }

  /**
   * @description Create User - Public Access
   * @Access Public access
   */
  public async createUser(user: IUser | any): Promise<IUser> {
    return await User.create(user);
  }

  /**
   * @description Update User - User access only
   * @Access User access - Protected
   */
  public async updateUser(id: string, user: IUser | any): Promise<IUser | null> {
    return await User.findOneAndUpdate({ _id: id }, user, { upsert: true });
  }

  /**
   * @description Update User - User access only
   * @Access User access - Protected
   */
  public async findAndUpdateUser(query: FilterQuery<IUser>, update: UpdateQuery<IUser>, options: QueryOptions) {
    return await User.findOneAndUpdate(query, update, options);
  }
}
