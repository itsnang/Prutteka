import { Request, Response, NextFunction } from 'express';

import { CustomAPIError } from '../errors/custom-api';

import { StatusCodes } from 'http-status-codes';

interface IError {
  message: string;
  statusCode: number;
}

export default function ErrorHandlerMiddleware(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ status: 'failed', message: err.message });
  }

  // debug
  console.log('Error: ', err.message);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'failed',
    message: 'Something went wrong, try again later',
  });
}
