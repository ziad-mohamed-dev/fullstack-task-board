const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

// No need for manual index - unique: true already creates an index

module.exports = mongoose.model('User', userSchema);
