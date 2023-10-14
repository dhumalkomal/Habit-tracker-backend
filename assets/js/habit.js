console.log("hello");
var addHabit= document.getElementById('addHabit');
var HabitForm = document.getElementById('habit-form');



// Event listener for the "Add Habit" button click
addHabit.addEventListener('click', function(){
    HabitForm.action = "/add-habit";

    HabitForm.submit(); // Submit form
})
