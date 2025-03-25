const express =  require('express');
const router = express.Router();

const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
  const habits = await Habit.find({})
  res.json(habits)
})

router.post('/', async (req, res) => {
  try {
    const {title, description} = req.body
    const habit = new Habit({title, description})
    await habit.save()
    res.json(habit)
  } catch (error) {
    res.status(400).json({message: "Error creating habit"})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id)
    res.json({message: "Habit: deleted"})
  } catch (err){
    res.status(400).json({message: "Habit: not found"})
  }
})

router.patch('/markasdone/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)
    habit.last_done = new Date()
    let message = 'Habit marked as done'
    if(timeDifferenceInHours(habit.last_done, habit.last_updated) < 24) {
      habit.last_updated = new Date()
      habit.days = timeDifferenceInDays(habit.last_done, habit.started_at)
      
    } else {
      habit.days = 1
      habit.started_at = new Date();
      habit.last_updated = new Date()
      message = 'Habit restarted'
    }
    habit.save()
    res.status(200).json({
      message
    })
  } catch ( e ) {
    console.log(e)
    res.status(500).json({
      message: 'Error updating Habit'
    })
  }
})

const timeDifferenceInHours = (start, end) => {
  const diffnceMS = Math.abs(start- end)
  return diffnceMS / (1000 * 60 * 60);
}

const timeDifferenceInDays = (start, end) => {
  const diffnceMS = Math.abs(start- end)
  return Math.floor( diffnceMS / (1000 * 60 * 60 * 24));
}
module.exports = router;
