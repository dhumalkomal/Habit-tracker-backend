const mongoose = require('mongoose');


// const mongoURL = 'mongodb://127.0.0.1:27017/Habit_tracker'; 

const mongoURL = 'mongodb+srv://himadrinayak:12345@cluster0.h7n86ah.mongodb.net/csv-upload?retryWrites=true&w=majority';


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
