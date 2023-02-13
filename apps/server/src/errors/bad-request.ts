import { CustomAPIError } from './custom-api';

import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST, 'BadRequestError');
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export { BadRequestError };
