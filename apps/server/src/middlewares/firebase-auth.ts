import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UnAuthorizedError } from '../errors';

import { auth } from '../libs/firebase';

export default async function FirebaseAuth(
  req: Request & { user?: DecodedIdToken },
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnAuthorizedError('No token provided');
    }

    const idToken = authorization.split(' ')[1];

    const user = await auth.verifyIdToken(idToken);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
