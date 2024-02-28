import User, { UserDocumet } from '../models/User';
import { createJWT } from '../utils/jwt.util';
import bcrypt from 'bcryptjs';
import { UnauthenticatedError, BadRequestError } from '../errors/index';

export interface AuthResponse {
  id?: string;
  username: string;
  email?: string;
  token: string;
}

export async function registerService(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const user = await User.create({ username, email, password });

  const token = createJWT({
    user: { userId: user._id, username: user.username },
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token: token,
  };
}

export async function loginService(
  email: string,
  candidatePassword: string
): Promise<AuthResponse> {
  if (!email || !candidatePassword) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = createJWT({
    user: { userId: user._id, username: user.username },
  });
  return {
    username: user.username,
    token,
  };
}
