const express =  require('express');
const router = express.Router();

const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
    const habits = await Habit.find()
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
    const habit = await Habit.findById(res.params.id)
    habit.last_done = new Date()
    if(timeDifferenceInHours(habit.last_done, habit.last_updated)) {
      habit.last_updated = new Date()
      habit.days = timeDifferenceInDays(habit.last_done, habit.started_at)
      habit.save()
    } 
    console.log(habit)
  } catch ( e ) {
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
