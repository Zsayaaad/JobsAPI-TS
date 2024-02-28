// verify the token and pass user to job route (user will be the link between token and crud op on jobs)

import { Request, RequestHandler, Response, NextFunction } from 'express';
import User from '../models/User';
// import jwt from 'jsonwebtoken';
import { UnauthenticatedError, BadRequestError } from '../errors/index';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    username: string;
  };
}

interface Decoded {
  user: {
    userId: string;
    username: string;
  };
  iat: number;
  exp: number;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid authentication');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as Decoded;

    req.user = { userId: payload.user.userId, username: payload.user.username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Invalid authentication');
  }
};

export { authMiddleware };
