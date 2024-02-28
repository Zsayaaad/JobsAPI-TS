import { CustomAPIError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  err: CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Something went wrong. Please try again later.`,
  };

  if (!err.code || (err.code && err.code !== 11000)) {
    customError.statusCode = 400;
    customError.msg = err.message;
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `This ${Object.keys(err.keyValue)} already exist`;
  }

  if (err.name === 'CastError') {
    customError.msg = `No job with id: ${err.value}`;
    customError.statusCode = 404;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export { errorHandlerMiddleware };
