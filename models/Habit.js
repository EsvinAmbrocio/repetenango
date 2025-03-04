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
  }
})

module.exports = mongoose.model('Habit', habitSchema)
