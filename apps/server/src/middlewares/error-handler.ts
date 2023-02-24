import { Request, Response, NextFunction } from 'express';

import { StatusCodes, ReasonPhrases } from 'http-status-codes';

interface IError {
  name: string;
  message: string;
  statusCode: number;
  errors: any[];
  code: number;
}

export default function ErrorHandlerMiddleware(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // debug
  console.log('Error: ', err);

  const customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errors: err.errors || [
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        name: ReasonPhrases.INTERNAL_SERVER_ERROR.split(' ').join(''),
        message: 'Something went wrong, try again later',
        path: 'internal_server',
      },
    ],
  };

  if ((err.name && err.code === 11000) || err.name === 'ValidationError') {
    customError.errors = Object.values(err.errors).map((err) =>
      Object.assign(
        {
          status: StatusCodes.BAD_REQUEST,
          name: err.name,
          message: err.message,
        },
        err
      )
    );
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    customError.errors = [
      {
        status: StatusCodes.BAD_REQUEST,
        name: err.name,
        message: err.message,
      },
    ];

    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.name === 'NotFoundError') {
    customError.errors = Object.values(err.errors).map((err) =>
      Object.assign(
        {
          status: StatusCodes.NOT_FOUND,
          name: err.name || '',
          message: err.message || '',
        },
        err
      )
    );
  }

  return res.status(customError.statusCode).json({
    errors: customError.errors,
  });
}
