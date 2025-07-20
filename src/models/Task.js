// import mongoose from 'mongoose';

// const TaskSchema = new mongoose.Schema(
//   {
//     title:     { type: String, required: true },
//     content:   { type: String, default: '' },
//     createdAt: { type: Date,   default: () => new Date() },
//   },
//   {
//     collection: 'tasks',
//     timestamps: false,
//   }
// );

// const Task = mongoose.model('Task', TaskSchema);
// export default Task;


// import mongoose from 'mongoose';

// const TaskSchema = new mongoose.Schema(
//   {
//     title:     { type: String, required: true },
//     content:   { type: String, default: '' },
//     archived:  { type: Boolean, required: false },
//     deleted:   { type: Boolean, required: false },
//     createdAt: { type: Date,   default: () => new Date() },
//   },
//   {
//     collection: 'tasks',
//     timestamps: false,
//   }
// );

// const Task = mongoose.model('Task', TaskSchema);
// export default Task;



// upcoming feature: add archive and delete functionality

import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    task:   { type: String, default: '' },
    completed:  { type: Boolean, required: false },
    archived:  { type: Boolean, required: false },
    deleted:   { type: Boolean, required: false },
    deadline:  { type: Date, required: false },
    createdAt: { type: Date,   default: () => new Date() },
  },
  {
    collection: 'tasks',
    timestamps: false,
  }
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;
