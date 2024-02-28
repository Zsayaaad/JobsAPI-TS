import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name required'],
    },
    position: {
      type: String,
      required: [true, 'position required'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'username required'],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model('Job', JobSchema);
