import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { TaskService } from '@/interfaces/ITask';
import { TaskBoardService } from '@interfaces/ITaskBoard';
import {
  CreateTaskInput,
  UpdateTaskInput,
  GetTaskInput,
  DeleteTaskInput,
  GetTasksByProjectIdInput,
} from '@/schema/taskSchema';

export class TaskController {
  private taskService = new TaskService();
  private taskBoardService = new TaskBoardService();

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
      const taskBoardId = req.params.taskBoardId;

      if (!Types.ObjectId.isValid(taskBoardId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      // Check if taskBoard exists
      const taskBoard = await this.taskBoardService.getTaskBoardById(taskBoardId);
      if (!taskBoard) return res.status(404).json({ message: 'Project not found' });

      const dueDateObj = new Date(req.body.dueDate);

      const payload = {
        taskBoardId: taskBoardId,
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        dueDate: dueDateObj,
        assignee: req.body.assignee,
      };

      const task = await this.taskService.createTask(payload);

      if (!task) return res.status(400).json({ message: 'Bad Request' });

      // Push task ID to taskBoard tasks array
      await this.taskBoardService.addTaskToTaskBoard(taskBoardId, task._id);

      return res.status(201).json({ data: task });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  /**
   * @description Get All Tasks By TaskBoard ID
   * @Access User access - Protected
   */
  public getTasksByProjectId = async (
    req: Request<GetTasksByProjectIdInput['params']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const taskBoardId = req.params.taskBoardId;

      if (!Types.ObjectId.isValid(taskBoardId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      // Check if taskBoard exists
      const taskBoard = await this.taskBoardService.getTaskBoardById(taskBoardId);
      if (!taskBoard) return res.status(404).json({ message: 'Bad Request, Project not found' });

      const tasks = await this.taskService.getTaskById(taskBoardId);

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
      const taskBoardId = req.body.taskBoardId;

      if (!Types.ObjectId.isValid(taskId)) return res.status(400).json({ message: 'Bad Request, Invalid Task ID' });
      if (!Types.ObjectId.isValid(taskBoardId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      // Check if task exists
      const task = await this.taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Bad Request, Task not found' });
      }

      // Handle tags if provided
      let newTags: string[] = [];
      if (req.body.tags !== undefined) {
        try {
          newTags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
        } catch (err) {
          return res.status(400).json({
            message: 'Bad Request, Invalid tags',
          });
        }
      }

      // Handle assignee if provided
      let newAssignee: Types.ObjectId[] = [];
      if (req.body.assignee !== undefined) {
        try {
          newAssignee = typeof req.body.assignee === 'string' ? JSON.parse(req.body.assignee) : req.body.assignee;
        } catch (err) {
          return res.status(400).json({
            message: 'Bad Request, Invalid assignee',
          });
        }
      }

      const newTaskBoardId = req.body.taskBoardId || taskBoardId;

      const newTask = {
        ...req.body,
        taskBoardId: taskBoardId,
        tags: req.body.tags !== undefined ? newTags : task.tags,
        assignee: req.body.assignee !== undefined ? newAssignee : task.assignee,
      };

      const updatedTask = await this.taskService.updateTask(taskId, newTask);

      if (!updatedTask) {
        return res.status(400).json({ message: 'Bad Request' });
      }

      // If taskBoardId is changed, update taskBoard tasks array
      if (task.taskBoardId.toString() !== newTaskBoardId) {
        await this.taskBoardService.removeTaskFromTaskBoard(task.taskBoardId, taskId);
        await this.taskBoardService.addTaskToTaskBoard(newTaskBoardId, taskId);
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
  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.taskId;
      const taskBoardId = req.body.taskBoardId;

      if (!Types.ObjectId.isValid(taskId)) return res.status(400).json({ message: 'Bad Request, Invalid Task ID' });
      if (!Types.ObjectId.isValid(taskBoardId))
        return res.status(400).json({ message: 'Bad Request, Invalid Project ID' });

      const task = await this.taskService.getTaskById(taskId);
      if (!task) return res.status(404).json({ message: 'Bad Request, Task not found' });

      if (task.taskBoardId.toString() !== taskBoardId) {
        return res.status(401).json({ message: 'Bad Request, Task does not belong to the project' });
      }

      const deletedTask = await this.taskService.deleteTask(taskId);

      if (!deletedTask) return res.status(400).json({ message: 'Bad Request' });

      // Remove task from taskBoard tasks array
      await this.taskBoardService.removeTaskFromTaskBoard(taskBoardId, taskId);

      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
