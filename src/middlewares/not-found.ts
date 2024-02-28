import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response) =>
  res.status(404).send('Rout does not exist');

export { notFoundMiddleware };
