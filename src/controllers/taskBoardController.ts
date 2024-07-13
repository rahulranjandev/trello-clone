import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { TaskBoardService } from '@interfaces/ITaskBoard';
import { ProjectService } from '@interfaces/IProject';
import {
  CreateTaskBoardInput,
  UpdateTaskBoardInput,
  DeleteTaskBoardInput,
  GetTaskBoardInput,
} from '@schema/taskBoardSchema';

export class TaskBoardController {
  private taskBoardService = new TaskBoardService();
  private projectService = new ProjectService();

  /**
   * @description Create TaskBoard
   * @Access User access - Protected
   */
  public createTaskBoard = async (
    req: Request<CreateTaskBoardInput['params'], CreateTaskBoardInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projectId = req.params.projectId;

      if (!Types.ObjectId.isValid(projectId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      // Check if project exists
      const project = await this.projectService.getProjectById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Bad Request, Project not found' });
      }

      const payload = {
        projectId: projectId,
        name: req.body.name,
      };

      const taskBoard = await this.taskBoardService.createTask(payload);
      if (!taskBoard) return res.status(400).json({ message: 'Bad Request' });

      // Push taskBoard ID to project taskBoards array
      await this.projectService.addTaskBoardToProject(projectId, taskBoard._id);

      return res.status(201).json({ data: taskBoard });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Get TaskBoard By Project ID
   * @Access User access - Protected
   */
  public getTaskBoardByProjectId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;

      if (!Types.ObjectId.isValid(projectId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      const taskBoards = await this.taskBoardService.getTasksByProjectId(projectId);

      return res.status(200).json({ data: taskBoards });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Update TaskBoard
   * @Access User access - Protected
   */
  public updateTaskBoard = async (
    req: Request<UpdateTaskBoardInput['params'], UpdateTaskBoardInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskBoardId = req.params.taskBoardId;

      if (!Types.ObjectId.isValid(taskBoardId))
        return res.status(400).json({ message: 'Bad Request, Invalid TaskBoard ID' });

      const taskBoard = await this.taskBoardService.getTaskBoardById(taskBoardId);

      if (!taskBoard) return res.status(404).json({ message: 'TaskBoard not found' });

      const updatedTaskBoard = await this.taskBoardService.updateTask(taskBoardId, req.body);

      return res.status(200).json({ data: updatedTaskBoard });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Delete TaskBoard
   * @Access User access - Protected
   */
  public deleteTaskBoard = async (req: Request<DeleteTaskBoardInput['params']>, res: Response, next: NextFunction) => {
    try {
      const taskBoardId = req.params.taskBoardId;

      if (!Types.ObjectId.isValid(taskBoardId))
        return res.status(400).json({ message: 'Bad Request, Invalid TaskBoard ID' });

      const taskBoard = await this.taskBoardService.getTaskBoardById(taskBoardId);

      if (!taskBoard) return res.status(404).json({ message: 'TaskBoard not found' });

      const deletedTaskBoard = await this.taskBoardService.deleteTask(taskBoardId);

      if (!deletedTaskBoard) return res.status(400).json({ message: 'Bad Request' });

      // Remove taskBoard ID from project taskBoards array
      await this.projectService.removeTaskBoardFromProject(taskBoard.projectId, taskBoardId);

      return res.status(200).json({ message: 'TaskBoard deleted successfully' });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
