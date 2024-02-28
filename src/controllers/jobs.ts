import { Request, RequestHandler, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JobService } from '../services/jobs.service';
interface AuthRequest extends Request {
  user: {
    userId: any;
    username: string;
  };
}

const getAllJobs = async (req: AuthRequest, res: Response) => {
  const {
    user: { userId },
  } = req;

  const jobs = await JobService.getAllJobs(userId);
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getOneJob = async (req: AuthRequest, res: Response) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await JobService.getOneJob(jobId, userId);
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req: AuthRequest, res: Response) => {
  const job = await JobService.createJob(req.body, req.user.userId);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req: AuthRequest, res: Response) => {
  const {
    params: { id: jobId },
    user: { userId },
    body: { company, position },
  } = req;

  const job = await JobService.updateJob(jobId, userId, { company, position });
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req: AuthRequest, res: Response) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await JobService.deleteJob(jobId, userId);
  res.status(StatusCodes.OK).json({ job });
};

export const jobsController = {
  getAllJobs,
  getOneJob,
  createJob,
  updateJob,
  deleteJob,
};
