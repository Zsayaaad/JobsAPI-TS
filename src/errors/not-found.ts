import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
    // this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default NotFoundError;
