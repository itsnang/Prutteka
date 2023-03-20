import { BadRequestError, UnAuthorizedError } from '../errors';
import AuthServices from '../services/auth.services';
import { Controller } from './types';
import serializer from '../serializer/user';
import getCurrentUrl from '../utils/getCurrentUrl';

export const login: Controller = async (req, res, next) => {
  try {
    const uid = req.user?.uid as string;

    const doc = await AuthServices.login(uid);
    if (!doc) {
      throw new UnAuthorizedError('Log in failed');
    }

    const currentUrl = getCurrentUrl(req);

    const user = serializer({ self: currentUrl }).serialize(doc);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const signup: Controller = async (req, res, next) => {
  try {
    const uid = req.user?.uid as string;
    const user = req.body;

    const doc = await AuthServices.signup(uid, user);

    if (!doc) {
      throw new UnAuthorizedError('Sign up failed');
    }

    const currentUrl = getCurrentUrl(req);

    const registeredUser = serializer({ self: currentUrl }).serialize(doc);

    res.status(201).json(registeredUser);
  } catch (error) {
    next(error);
  }
};
