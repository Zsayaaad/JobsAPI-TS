import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api';

class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
    // this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default UnauthenticatedError;
