const express = require('express');
const router  = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { validateBody } = require('../middleware/validate');
const { boardSchema }  = require('../validation/schemas');
const {
  createBoard,
  getUserBoards,
  getBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');


router.get('/', protect, getUserBoards);
router.post('/', protect, validateBody(boardSchema), createBoard);
router.get('/:id', protect, getBoard);
router.put('/:id', protect, validateBody(boardSchema), updateBoard);
router.delete('/:id', protect, deleteBoard);


module.exports = router;