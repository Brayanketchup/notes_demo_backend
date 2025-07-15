// import mongoose from 'mongoose';

// const NoteSchema = new mongoose.Schema(
//   {
//     title:     { type: String, required: true },
//     content:   { type: String, default: '' },
//     createdAt: { type: Date,   default: () => new Date() },
//   },
//   {
//     collection: 'notes',
//     timestamps: false,
//   }
// );

// const Note = mongoose.model('Note', NoteSchema);
// export default Note;

// upcoming feature: add archive and delete functionality
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true },
    content:   { type: String, default: '' },
    archive:     { type: Boolean, required: false },
    deleted:     { type: Boolean, required: false },
    createdAt: { type: Date,   default: () => new Date() },
  },
  {
    collection: 'notes',
    timestamps: false,
  }
);

const Note = mongoose.model('Note', NoteSchema);
export default Note;
