const Board = require('../models/Board');
const Task = require('../models/Task');


exports.createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const defaultTasks = [
      { name: 'Task in Progress', status: 'In Progress', icon: '⏰' },
      { name: 'Task Completed', status: 'Completed', icon: '✅' },
      { name: 'Task Won’t Do', status: "Won't Do", icon: '❌' },
      { name: 'Task To Do', status: 'To Do', icon: '📋' }
    ];
    
    const tasks = await Task.insertMany(defaultTasks);
    const taskIds = tasks.map(t => t._id);

    
    const board = await Board.create({
      name,
      description,
      tasks,
      user: req.user.userId
    });
    
    await Task.updateMany({ _id: { $in: taskIds } }, { board: board._id });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserBoards = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const total  = await Board.countDocuments({ user: req.user.userId });
    const pages  = Math.ceil(total / limit);
    const boards = await Board.find({ user: req.user.userId })
      .populate('tasks')
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({
      metadata: { total, page, pages, limit },
      data: boards
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, user: req.user.userId }).populate('tasks');
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateBoard = async (req, res) => {
  try {
    const updated = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Board not found or unauthorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, user: req.user.userId });
    if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });

    await Task.deleteMany({ board: board._id });
    await board.deleteOne();

    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
