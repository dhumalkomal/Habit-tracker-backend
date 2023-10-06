console.log("hello");
var addTask= document.getElementById('addHabit');
var HabitForm = document.getElementById('habit-form');
var deleteHabit = document.getElementById("deleteHabit");


// Event listener for the "Add Task" button click
addTask.addEventListener('click', function(){
    HabitForm.action = "/add-habit";

    HabitForm.submit(); // Submit form
})
