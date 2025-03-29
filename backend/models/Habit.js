const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  },
  last_done: {
    type: Date,
    default: Date.now
  },
  days: {
    type: Number,
    default: 1
  },
  started_at: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = mongoose.model('Habit', habitSchema)
