import { CustomAPIError } from './custom-api';

import { StatusCodes } from 'http-status-codes';

class UnAuthorizedError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export { UnAuthorizedError };
