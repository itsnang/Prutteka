import { CustomAPIError } from './custom-api';

import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND, 'NotFoundError');
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export { NotFoundError };
