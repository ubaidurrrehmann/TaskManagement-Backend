const express = require('express');
const router = express.Router();
// REMOVED: const auth = require('../middleware/auth');

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// Global routes: open to anyone
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;