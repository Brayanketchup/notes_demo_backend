import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true },
    content:   { type: String, default: '' },
    createdAt: { type: Date,   default: () => new Date() },
    dueBy:     { type: Date },
  },
  {
    collection: 'tasks',
    timestamps: false,
  }
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;
