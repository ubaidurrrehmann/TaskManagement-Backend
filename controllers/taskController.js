const Task = require('../models/Task');

// 1. Get all tasks (No user filter)
const getTasks = async (req, res) => {
  try {
    // Fetches all tasks in the database, ordered by newest first
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Create a task (No user relationship)
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    // Removed the "user: req.user" field entirely
    const newTask = new Task({
      title,
      description,
      status,
      dueDate
    });
    
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Update a task (No ownership check)
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // REMOVED: The block checking if (task.user.toString() !== req.user)

    task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Delete a task (No ownership check)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // REMOVED: The block checking if (task.user.toString() !== req.user)

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Explicit group export so Express routes can read them perfectly
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};