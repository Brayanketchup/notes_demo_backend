import express from 'express';
import Task from '../models/Task.js'; 
import { Types } from 'mongoose';

const router = express.Router();

// GET all
// router.get('/', async (req, res) => {
//   try {
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     return res.json(tasks);
//   } catch (err) {
//     console.error('Error fetching tasks:', err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ deleted: { $ne: true } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/deleted', async (req, res) => {
  try {
    
    const deletedTasks = await Task.find({ deleted: true });
    res.json(deletedTasks);
  } catch (err) {
    console.error('Error fetching deleted tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json(task);
  } catch (err) {
    console.error(`Error fetching task ${id}:`, err);
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
    const newTask = await Task.create({
      title,
      content: content || '',
    });

    return res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// PUT 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json(updated);
  } catch (err) {
    console.error(`Error updating task ${id}:`, err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   if (!Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid task ID' });
//   }

//   try {
//     const deleted = await Task.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     return res.json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     console.error(`Error deleting task ${id}:`, err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/deleted', async (req, res) => {
//   try {
//     const deletedTasks = await Task.find({ deleted: true });
//     res.json(deletedTasks);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// delete 
router.patch('/:id/delete', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//recover
router.patch('/:id/restore', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// export default router;

export default router;

