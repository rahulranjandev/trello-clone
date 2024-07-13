import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { ProjectService } from '@interfaces/IProject';
import { CreateProjectInput, UpdateProjectInput } from '@/schema/projectSchema';

export class ProjectController {
  private projectService = new ProjectService();

  /**
   * @description Create Project
   * @Access User access - Protected
   */
  public createProject = async (req: Request<{}, CreateProjectInput['body']>, res: Response, next: NextFunction) => {
    try {
      const payload = {
        name: req.body.name,
        description: req.body.description,
        userId: res.locals.user.id,
      };

      const project = await this.projectService.createProject(payload);

      if (!project) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      return res.status(201).json({ data: project });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Get All Projects By User
   * @Access User access - Protected
   */
  public getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await this.projectService.getProjectsByUser(res.locals.user.id);

      return res.status(200).json({ data: projects });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Get Project By Id with all tasks (Need to check)
   * @Access User access - Protected
   */
  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;
      const userId = res.locals.user.id;

      if (!Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid Project ID' });
      }

      // Check if project Owner is the same as the user
      const projectOwner = await this.projectService.getProjectByQuery({ _id: projectId, userId: userId });

      if (!projectOwner) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const project = await this.projectService.getProjectById(projectId);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json({ data: project });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Update Project
   * @Access User access - Protected
   */
  public updateProject = async (
    req: Request<UpdateProjectInput['params'], UpdateProjectInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projectId = req.params.projectId;
      const userId = res.locals.user.id;
      const { name, description } = req.body;

      if (!Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid Project ID' });
      }

      const updateProject: Partial<UpdateProjectInput> = {
        params: { projectId },
        body: { name, description },
      };

      // Check if project exists
      const projectExists = await this.projectService.getProjectByQuery({ _id: projectId });

      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if project Owner is the same as the user
      if (projectExists.userId.toString() !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const project = await this.projectService.findAndUpdateProject(
        { _id: projectId },
        { $set: updateProject.body },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: 'Bad Request' });
      }

      return res.status(200).json({ data: project });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Delete Project
   * @Access User access - Protected
   */
  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;
      const userId = res.locals.user.id;

      if (!Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid Project ID' });
      }

      // Check if project exists
      const projectExists = await this.projectService.getProjectByQuery({ _id: projectId });

      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found' });
      }

      // Check if project Owner is the same as the user
      if (projectExists.userId.toString() !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const project = await this.projectService.deleteProject(projectId);

      if (!project) {
        return res.status(404).json({ message: 'Bad Request' });
      }

      return res.status(200).json({ message: 'Project Deleted' });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
