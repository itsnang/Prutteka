import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

export default function NotFoundMiddleware(req: Request, res: Response) {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: 'not-found', message: 'Route does not exist' });
}
