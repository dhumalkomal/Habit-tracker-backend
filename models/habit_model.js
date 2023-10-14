const mongoose = require('mongoose');

// schema for the 'List' collection
const HabitSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },

    dates: [{
        date:String,
        complete: String
    }]
} , {
    
    timestamps:true // Automatically add 'createdAt' and 'updatedAt' fields
});

// Create 'Habits' model based on the schema
const Habits = mongoose.model('Habits', HabitSchema);

module.exports = Habits;