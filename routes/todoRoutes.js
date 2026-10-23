import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET /api/todos - Get all to-do items
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve todos', error: error.message });
  }
});

// POST /api/todos - Add a new to-do item
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = new Todo({ title: title.trim() });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo', error: error.message });
  }
});

export default router;
