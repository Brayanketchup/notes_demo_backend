import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true },
    content:   { type: String, default: '' },
    createdAt: { type: Date,   default: () => new Date() },
    dueBy:     { type: Date },
  },
  {
    collection: 'notes',
    timestamps: false,
  }
);

const Note = mongoose.model('Note', NoteSchema);
export default Note;
