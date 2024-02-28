import jwt from 'jsonwebtoken';

interface TokenPayload {
  user: {
    userId: string;
    username: string;
  };
}

export const createJWT = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
