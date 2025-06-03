
const express = require('express');
const router  = express.Router();                    

const { protect } = require("../middleware/authMiddleware");

const { validateBody } = require('../middleware/validate');
const { taskSchema }   = require('../validation/schemas');

const {
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { createTask } = require('../controllers/taskController');


router.get('/',    protect, getTasks);
router.post('/', protect, validateBody(taskSchema), createTask);
router.put('/:id', protect, validateBody(taskSchema), updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
