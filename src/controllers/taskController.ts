import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { TaskService } from '@/interfaces/ITask';
import { ProjectService } from '@interfaces/IProject';
import {
  CreateTaskInput,
  UpdateTaskInput,
  GetTaskInput,
  DeleteTaskInput,
  GetTasksByProjectIdInput,
} from '@/schema/taskSchema';

export class TaskController {
  private taskService = new TaskService();
  private projectService = new ProjectService();

  /**
   * @description Create Task
   * @Access User access - Protected
   */
  public createTask = async (
    req: Request<CreateTaskInput['params'], CreateTaskInput['body']>,
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

      if (!project) return res.status(404).json({ message: 'Project not found' });

      const dueDateObj = new Date(req.body.dueDate);

      const payload = {
        projectId: projectId,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        tags: req.body.tags,
        dueDate: dueDateObj,
        assignee: req.body.assignee,
      };

      const task = await this.taskService.createTask(payload);

      if (!task) return res.status(400).json({ message: 'Bad Request' });

      return res.status(201).json({ data: task });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Get All Tasks By Project ID
   * @Access User access - Protected
   */
  public getTasksByProjectId = async (
    req: Request<GetTasksByProjectIdInput['params']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projectId = req.params.projectId;

      if (!Types.ObjectId.isValid(projectId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      // Check if project exists
      const project = await this.projectService.getProjectById(projectId);
      if (!project) return res.status(404).json({ message: 'Bad Request, Project not found' });

      const tasks = await this.taskService.getTasksByProjectId(projectId);

      return res.status(200).json({ data: tasks });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Get Task By Task ID
   * @Access User access - Protected
   */
  public getTaskById = async (req: Request<GetTaskInput['params']>, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.taskId;

      if (!Types.ObjectId.isValid(taskId)) return res.status(400).json({ message: 'Bad Request, Invalid Task ID' });

      const task = await this.taskService.getTaskById(taskId);

      if (!task) return res.status(404).json({ message: 'Bad Request, Task not found' });

      return res.status(200).json({ data: task });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Update Task
   * @Access User access - Protected
   */
  public updateTask = async (
    req: Request<UpdateTaskInput['params'], UpdateTaskInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskId = req.params.taskId;
      const projectId = req.params.projectId;

      if (!Types.ObjectId.isValid(taskId)) return res.status(400).json({ message: 'Bad Request, Invalid Task ID' });
      if (!Types.ObjectId.isValid(projectId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      const newTask: Partial<UpdateTaskInput['body']> = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        tags: req.body.tags,
        dueDate: req.body.dueDate,
        assignee: req.body.assignee,
      };

      // Check if task exists
      const task = await this.taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Bad Request, Task not found' });
      }

      // Check project belongs to the task
      if (task.projectId.toString() !== projectId) {
        return res.status(401).json({ message: 'Bad Request, Task does not belong to the project' });
      }

      const updatedTask = await this.taskService.findAndUpdateTask({ _id: taskId }, newTask, { new: true });

      if (!updatedTask) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      return res.status(200).json({ data: updatedTask });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Delete Task
   * @Access User access - Protected
   */
  public deleteTask = async (req: Request<DeleteTaskInput['params']>, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.taskId;
      const projectId = req.params.projectId;

      if (!Types.ObjectId.isValid(taskId)) return res.status(400).json({ message: 'Bad Request, Invalid Task ID' });
      if (!Types.ObjectId.isValid(projectId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      const task = await this.taskService.getTaskById(taskId);
      if (!task) return res.status(404).json({ message: 'Bad Request, Task not found' });

      if (task.projectId.toString() !== projectId) {
        return res.status(401).json({ message: 'Bad Request, Task does not belong to the project' });
      }

      const deletedTask = await this.taskService.deleteTask(taskId);

      if (!deletedTask) return res.status(400).json({ message: 'Bad Request' });

      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
