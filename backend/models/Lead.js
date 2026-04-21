import mongoose from 'mongoose';

export const leadStatuses = ['New', 'Contacted', 'Qualified', 'Closed', 'Lost'];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    budget: {
      type: Number,
      min: [0, 'Budget must be a positive number'],
      default: 0
    },
    preferences: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: leadStatuses,
      default: 'New'
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
