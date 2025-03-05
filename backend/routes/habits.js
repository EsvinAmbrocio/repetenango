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

module.exports = router;
