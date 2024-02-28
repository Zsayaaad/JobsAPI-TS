import { Job } from '../models/Jobs';
import { NotFoundError, BadRequestError } from '../errors/index';

interface requestJobSchema {
  company: string;
  position: string;
  createdBy: string;
  name: string;
}

const createJob = async (body: requestJobSchema, userId: string) => {
  body.createdBy = userId;
  return await Job.create(body);
};

const getAllJobs = async (userId: string) => {
  const job = await Job.find({ createdBy: userId });
  return job;
};

const getOneJob = async (jobId: string, userId: string) => {
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`no job with id: ${jobId}`);
  }
  return job;
};

const updateJob = async (
  jobId: string,
  userId: string,
  body: Partial<requestJobSchema>
) => {
  if (body.company === '' || body.position === '') {
    throw new BadRequestError(`company and position fields cannot be empty`);
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`no job with id: ${jobId}`);
  }
  return job;
};

const deleteJob = async (jobId: string, userId: string) => {
  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`no job with id: ${jobId}`);
  }
  return job;
};

export const JobService = {
  createJob,
  getAllJobs,
  getOneJob,
  updateJob,
  deleteJob,
};
