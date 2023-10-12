// const router = require('express').Router();
const Habit = require('../models/habit_model')

// import require module express framework
const express = require('express');
// create new router instance
const router =  express.Router();
// Import  Habit controller
const HabitController =  require('../controllers/Habit_controller');

console.log('Router Loaded');

// routes handle home page
router.get('/', HabitController.Habit);
// routes handle add habit
router.post('/add-habit', HabitController.addHabit);
router.post('/habit', HabitController.habitContent);
router.get('/habitStatus', HabitController.habitStatus);
router.get('/:id', HabitController.deleteHabit);
// routes handle delete habit
router.post('/delete-habit', HabitController.deleteHabit);


// Export the router 
module.exports = router;