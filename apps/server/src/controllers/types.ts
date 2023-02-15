import { Request, Response, NextFunction } from 'express';
import {} from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export type Controller = (
  req: Request & { user?: DecodedIdToken },
  res: Response,
  next: NextFunction
) => Promise<void>;
