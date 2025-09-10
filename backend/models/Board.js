const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

// Index for faster user-specific board queries
boardSchema.index({ user: 1 });
boardSchema.index({ user: 1, createdAt: -1 }); // User boards sorted by creation date

module.exports = mongoose.model('Board', boardSchema);
