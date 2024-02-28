import * as dotenv from 'dotenv';
import 'express-async-errors';
import express, { Request, Response } from 'express';
// security packages
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

dotenv.config();

import connectDB from './utils/connect';

import { notFoundMiddleware } from './middlewares/not-found';
import { errorHandlerMiddleware } from './middlewares/error-handler';

import auhtRouter from './routes/auth';
import auhtJobs from './routes/jobs';

const app = express();

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', auhtRouter);
app.use('/api/v1/jobs', auhtJobs);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const server = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

server();
