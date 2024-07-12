import { NextFunction, Request, Response } from 'express';

import { UpdateUserInput } from '@/schema/userSchema';
import { UserService } from '@interfaces/IUser';

export class UserController {
  private userService = new UserService();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(res.locals.user.id);

      if (!user) return res.status(400).json({ message: 'User does not exist' });

      return res.status(200).json({ data: user });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  public updateUser = async (req: Request<{}, UpdateUserInput['body']>, res: Response, next: NextFunction) => {
    try {
      const id = res.locals.user.id;

      // Create a payload with only the fields provided in the request body
      const payload: Partial<UpdateUserInput['body']> = {};
      if (req.body.name) payload.name = req.body.name;
      if (req.body.email) payload.email = req.body.email;

      if (payload.email) {
        const existingUser = await this.userService.getUserByEmail(payload.email);
        if (existingUser) {
          return res.status(400).json({ message: 'Email already taken' });
        }
      }

      // Update user's email and/or name in the database
      const updatedUser = await this.userService.findAndUpdateUser({ _id: id }, { $set: payload }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return the updated user data
      return res.status(200).json({ data: updatedUser });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
