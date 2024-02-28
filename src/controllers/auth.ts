import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { registerService } from '../services/auth.service';
import { loginService } from '../services/auth.service';

// POST => /auth/user
const registerHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await registerService(username, email, password);

  res.status(StatusCodes.CREATED).json({ user: user });
};

// POST => /auth/sessions
const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginService(email, password);

  res.status(StatusCodes.OK).json({ user });
};

// GET => /auth/sessions (Get user's sessions )

// Logout
// DELETE => /auth/sessions

export { registerHandler, loginHandler };
