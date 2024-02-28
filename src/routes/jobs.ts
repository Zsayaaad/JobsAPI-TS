import express, { Router } from 'express';
import { jobsController } from '../controllers/jobs';
import { authMiddleware } from '../middlewares/authentication';

const router = express.Router();

router
  .route('/')
  .get(authMiddleware, jobsController.getAllJobs)
  .post(authMiddleware, jobsController.createJob);

router
  .route('/:id')
  .get(authMiddleware, jobsController.getOneJob)
  .patch(authMiddleware, jobsController.updateJob)
  .delete(authMiddleware, jobsController.deleteJob);

export default router;
