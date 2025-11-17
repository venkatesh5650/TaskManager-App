const Task = require('../models/task');

// Fetch all tasks for the logged-in user with optional search + status filter
const getTasks = async (req, res) => {
  try {
    const { q = '', status = '' } = req.query;
    const where = { userId: req.user.id }; // Restrict results to authenticated user

    // Apply search filter (title contains query)
    if (q) where.title = { [require('sequelize').Op.like]: `%${q}%` };

    // Apply status filter (pending/completed)
    if (status) where.status = status;

    // Latest tasks first
    const tasks = await Task.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new task for the authenticated user
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Title is mandatory
    if (!title) return res.status(400).json({ msg: 'Title required' });

    // Save task linked to user
    const task = await Task.create({ title, description, userId: req.user.id });
    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update an existing task: only owner can update
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Ensure task belongs to logged-in user
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Update only provided fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save(); // Persist changes
    res.json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a task owned by the logged-in user
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership before deletion
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await task.destroy();
    res.json({ msg: 'Task deleted' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
