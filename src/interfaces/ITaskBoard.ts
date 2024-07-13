import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { ITaskBoard, TaskBoard } from '@models/taskBoardModel';

export class TaskBoardService {
  /**
   * @description Remove Task from TaskBoard
   * @Access User access - Protected
   * @param taskBoardId
   * @param taskId
   */
  public async removeTaskFromTaskBoard(taskBoardId: string | any, taskId: string | any) {
    return await TaskBoard.findOneAndUpdate({ _id: taskBoardId }, { $pull: { tasks: taskId } }, { new: true });
  }
  /**
   * @description Remove Task from TaskBoard
   * @Access User access - Protected
   * @param taskBoardId
   * @param taskId
   */
  public async addTaskToTaskBoard(taskBoardId: string | any, taskId: string | any) {
    return await TaskBoard.findOneAndUpdate({ _id: taskBoardId }, { $push: { tasks: taskId } }, { new: true });
  }
  public async getTaskBoardById(taskBoardId: string) {
    return await TaskBoard.findById(taskBoardId);
  }

  /**
   * @description Create TaskBoard
   * @Access User access - Protected
   * @param taskboard
   */
  public async createTask(taskboard: ITaskBoard | any): Promise<ITaskBoard> {
    return await TaskBoard.create(taskboard);
  }

  /**
   * @description Get All Tasks By Project ID
   * @Access User access - Protected
   * @param projectId
   */
  public async getTasksByProjectId(projectId: string): Promise<ITaskBoard[]> {
    return await TaskBoard.find({ projectId }).populate('projectId', 'name').populate('tasks');
  }

  /**
   * @description Update TaskBoard
   * @Access User access - Protected
   * @param id
   * @param taskboard
   */
  public async updateTask(id: string, taskboard: ITaskBoard | any): Promise<ITaskBoard | null> {
    return await TaskBoard.findOneAndUpdate({ _id: id }, taskboard, { upsert: false, new: true });
  }

  /**
   * @description Delete TaskBoard
   * @Access User access - Protected
   * @param taskboardId
   */
  public async deleteTask(taskboardId: string): Promise<ITaskBoard | null> {
    return await TaskBoard.findByIdAndDelete(taskboardId);
  }

  /**
   * @description Delete TaskBoard
   * @Access User access - Protected
   * @param query
   */
  public async findAndUpdateTask(
    query: FilterQuery<ITaskBoard>,
    update: UpdateQuery<ITaskBoard>,
    options: QueryOptions
  ) {
    return await TaskBoard.findOneAndUpdate(query, update, options);
  }
}
