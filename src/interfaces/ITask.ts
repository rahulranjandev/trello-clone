import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { Task, ITask } from '@models/taskModel';

export class TaskService {
  /**
   * @description Create Task
   * @Access User access - Protected
   * @param task
   */
  public async createTask(task: ITask | any): Promise<ITask> {
    return await Task.create(task);
  }

  /**
   * @description Get All Tasks By Project ID
   * @Access User access - Protected
   * @param projectId
   */
  public async getTasksByProjectId(projectId: string): Promise<ITask[]> {
    return await Task.find({ projectId }).lean();
  }

  /**
   * @description Get Task By Task ID
   * @Access User access - Protected
   * @param taskId
   */
  public async getTaskById(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId);
  }

  /**
   * @description Update Task
   * @Access User access - Protected
   * @param id
   * @param task
   */
  public async updateTask(id: string, task: ITask | any): Promise<ITask | null> {
    return await Task.findOneAndUpdate({ _id: id }, task, { upsert: false });
  }

  /**
   * @description Delete Task
   * @Access User access - Protected
   * @param taskId
   */
  public async deleteTask(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
  }

  /**
   * @description Delete Task
   * @Access User access - Protected
   * @param query
   */
  public async findAndUpdateTask(query: FilterQuery<ITask>, update: UpdateQuery<ITask>, options: QueryOptions) {
    return await Task.findOneAndUpdate(query, update, options);
  }
}
