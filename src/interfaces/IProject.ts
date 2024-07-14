import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { Project, IProject } from '@models/projectModel';

export class ProjectService {
  /**
   * @description Remove TaskBoard from Project
   * @Access User access - Protected
   */
  public async removeTaskBoardFromProject(projectId: string | any, taskBoardId: string | any) {
    return await Project.findOneAndUpdate({ _id: projectId }, { $pull: { taskBoards: taskBoardId } }, { new: true });
  }

  /**
   * @description Add TaskBoard to Project
   * @Access User access - Protected
   */
  public async addTaskBoardToProject(projectId: string | any, _id: string | any) {
    return await Project.findOneAndUpdate({ _id: projectId }, { $push: { taskBoards: _id } }, { new: true });
  }
  /**
   * @description Create Project
   * @Access User access - Protected
   */
  public async createProject(project: IProject | any): Promise<IProject> {
    return await Project.create(project);
  }

  /**
   * @description Get Project Info By Project ID with all tasks
   * @Access User access - Protected
   * @param id
   */
  public async getProjectById(id: string): Promise<IProject | null> {
    return await Project.findById(id);
  }

  /**
   * @description Get All Projects By User
   * @Access User access - Protected
   */
  public async getProjectsByUser(userId: string): Promise<IProject[]> {
    return await Project.find({ userId }).lean();
  }

  /**
   * @description Get Project Info
   * @Access User access - Protected
   */
  public async getProjectByQuery(query: FilterQuery<IProject>): Promise<IProject | null> {
    return await Project.findOne(query as FilterQuery<IProject>);
  }

  /**
   * @description Update Project
   * @Access User access - Protected
   */
  public async updateProject(id: string, project: IProject | any): Promise<IProject | null> {
    return await Project.findOneAndUpdate({ _id: id }, project, { upsert: false });
  }

  /**
   * @description Update Project
   * @Access User access - Protected
   */
  public async findAndUpdateProject(
    query: FilterQuery<IProject>,
    update: UpdateQuery<IProject>,
    options: QueryOptions
  ) {
    return await Project.findOneAndUpdate(query, update, options);
  }

  /**
   * @description Delete Project
   * @Access User access - Protected
   */
  public async deleteProject(id: string) {
    return await Project.findByIdAndDelete(id);
  }
}
