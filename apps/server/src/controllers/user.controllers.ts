import User from '../models/user';
import { Controller } from './types';
import UserService from '../services/user.services';
import { BadRequestError } from '../errors';

export const createUser: Controller = async (req, res, next) => {
  try {
    const firebaseUser = req.user;
    const { username, email } = req.body;

    if (!firebaseUser) {
      throw new BadRequestError('Please provide firebase token');
    }

    const user = await UserService.createUser(
      { username, email },
      firebaseUser?.uid as string
    );

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};
