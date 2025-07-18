import express from 'express';
import Note from '../models/Note.js'; 
import { Types } from 'mongoose';

const router = express.Router();

// GET all
// router.get('/', async (req, res) => {
//   try {
//     const notes = await Note.find().sort({ createdAt: -1 });
//     return res.json(notes);
//   } catch (err) {
//     console.error('Error fetching notes:', err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });



router.get('/', async (req, res) => {
  try {
    const Notes = await Note.find({ deleted: { $ne: true } });
    res.json(Notes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/deleted', async (req, res) => {
  try {
    const deletedNotes = await Note.find({ deleted: true });
    res.json(deletedNotes);
  } catch (err) {
    console.error('Error fetching deleted notes:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.json(note);
  } catch (err) {
    console.error(`Error fetching note ${id}:`, err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST 
router.post('/', async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newNote = await Note.create({
      title,
      content: content || '',
    });

    return res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// PUT 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid note ID' });
  }

  try {
    const updated = await Note.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.json(updated);
  } catch (err) {
    console.error(`Error updating note ${id}:`, err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   if (!Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid note ID' });
//   }

//   try {
//     const deleted = await Note.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ error: 'Note not found' });
//     }
//     return res.json({ message: 'Note deleted successfully' });
//   } catch (err) {
//     console.error(`Error deleting note ${id}:`, err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/deleted', async (req, res) => {
//   try {
//     const deletedNotes = await Note.find({ deleted: true });
//     res.json(deletedNotes);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// delete 
router.patch('/:id/delete', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//recover
router.patch('/:id/restore', async (req, res) => {
  try {
    const updatedNote = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;


