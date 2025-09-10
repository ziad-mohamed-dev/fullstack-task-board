const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const { validateBody } = require('../middleware/validate');
const { createTaskSchema, updateTaskSchema } = require('../validation/schemas');

const {
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { createTask } = require('../controllers/taskController');

router.get('/', protect, getTasks);
router.post('/', protect, validateBody(createTaskSchema), createTask);
router.put('/:id', protect, validateBody(updateTaskSchema), updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
