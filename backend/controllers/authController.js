const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Board = require('../models/Board');
const Task = require('../models/Task');

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: 'Username already exists' });


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();


    const defaultBoard = new Board({
      name: 'Getting Started',
      description: 'Your first board',
      user: newUser._id
    });
    await defaultBoard.save();


    const defaultTasks = [
      {
        name: 'Task in Progress',
        icon: '⏰',
        status: 'In Progress',
        board: defaultBoard._id
      },
      {
        name: 'Task Completed',
        icon: '🏋️‍♀️',
        status: 'Completed',
        board: defaultBoard._id
      },
      {
      // eslint-disable-next-line no-useless-escape
        name: 'Task Won\’t Do',
        icon: '☕',
        status: 'Wontt Do',
        board: defaultBoard._id
      },
      {
        name: 'Task To Do',
        description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
        icon: '📚',
        status: 'To Do',
        board: defaultBoard._id
      }
    ];


    const createdTasks = await Task.insertMany(defaultTasks);


    defaultBoard.tasks = createdTasks.map(task => task._id);
    await defaultBoard.save();


    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });


    res.status(201).json({
      message: 'User created and logged in successfully',
      token,
      user: {
        _id: newUser._id,
        username: newUser.username
      },
      board: {
        _id: defaultBoard._id,
        name: defaultBoard.name,
        description: defaultBoard.description,
        tasks: createdTasks.map(task => ({
          _id: task._id,
          name: task.name,
          status: task.status,
          icon: task.icon,
          description: task.description
        }))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ message: 'Login successful' });
};

exports.signout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'signed out' });
};

exports.verfiyToken = (req, res) => {
  res.status(200).json({ user: req.user });
};
