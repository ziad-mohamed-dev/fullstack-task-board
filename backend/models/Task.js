const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,

  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed', 'Won\'t Do', 'Other'],
    default: 'To Do'
  },

  customStatus: {
    type: String,
    default: ''
  },

  icon: String,

  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }
}, {
  timestamps: true
});

// Index for faster board-specific task queries
taskSchema.index({ board: 1 });
taskSchema.index({ board: 1, status: 1 }); // Tasks by board and status
taskSchema.index({ board: 1, createdAt: -1 }); // Tasks by board sorted by creation date

module.exports = mongoose.model('Task', taskSchema);
