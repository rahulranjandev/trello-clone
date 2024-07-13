import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { Task, ITask } from '@models/taskModel';
import { Project, IProject } from '@models/projectModel';

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
   * @description Get Task By Task ID
   * @Access User access - Protected
   * @param taskId
   */
  public async getTaskById(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId).populate('taskBoardId', 'name');
  }

  /**
   * @description Update Task
   * @Access User access - Protected
   * @param id
   * @param task
   */
  public async updateTask(id: string, task: ITask | any): Promise<ITask | null> {
    return await Task.findOneAndUpdate({ _id: id }, task, { upsert: false, new: true });
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
