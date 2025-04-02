const express =  require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Habit = require('../models/Habit');

const authenticateToken = (req, res, next) => {
  const token = String(req.headers['authorization'] ?? '')

  if(!token) {
    return res.status(401).json({
      message: "Acceso denegado. Token no proporcionado."
    })
  }
  
  try {
    const tokenWithoutBearer = token.replace('Bearer ', '')
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET) 
    req.user = verified
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({
      message: "Acceso denegado. Token inválido."
    })
  }
};
router.use(authenticateToken) 

router.get('/', async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Acceso denegado. Token no proporcionado."
      })
    } 
    const user_id = req.user.id
    const habits = await Habit.find({
      user_id: new mongoose.Types.ObjectId(user_id)
    })
    res.json(habits)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error fetching habits"
    })
  }
})

router.post('/', async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Acceso denegado. Token no proporcionado."
      })
    } 
    const user_id = new mongoose.Types.ObjectId(req.user.id)
    const {title, description} = req.body
    const habit = new Habit({title, description, user_id})
    await habit.save()
    res.json(habit)
  } catch (error) {
    console.log(error)
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
