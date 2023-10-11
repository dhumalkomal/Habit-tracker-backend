const mongoose = require('mongoose');


// const mongoURL = 'mongodb://127.0.0.1:27017/Habit_tracker'; 

const mongoURL = 'mongodb+srv://Addhabit:addhabit@cluster0.krqzlcy.mongodb.net/habits-tracker?retryWrites=true&w=majority';

mongoose.set("strictQuery", false);

const db = mongoose.Connection;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Export the database connection 
module.exports = db;
