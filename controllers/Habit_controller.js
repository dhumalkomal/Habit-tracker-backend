const Habit =  require('../models/habit_model');

//function handle
// Get Habits From Database
module.exports.Habit = async function (req, res) {

    Habit.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 })
    // if(err) console.log(err)    
    .then(habit => {
            var days = [];
            days.push(getD(0));
            days.push(getD(1));
            days.push(getD(2));
            days.push(getD(3));
            days.push(getD(4));
            days.push(getD(5));
            days.push(getD(6));
            res.render('habit', { habit, days });
        })
        .catch(err => {
            console.log(err);
        });
}
// Find the Date and Return the string Date
function getD(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return { date: newDate, day };
}

// handle habit content
module.exports.habitContent = async function(req, res){
    const { content } = req.body;
        console.log(content)
        Habit.findOne({ content:content }).then(habit => {
            if (habit) {
                // Update Existing Habit Status
                let dates = habit.dates, tzoffset = (new Date()).getTimezoneOffset() * 60000;
                var today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
                dates.find(function (item, index) {
                    if (item.date === today) {
                        console.log("Habit Already inserted in Database")
                        
                        res.redirect('back');
                    }
                    else {
                        dates.push({ date: today, complete: 'none' });
                        habit.dates = dates;
                        habit.save()
                            .then(habit => {
                                console.log(habit);
                                res.redirect('back');
                            })
                            .catch(err => console.log(err));
                    }
                });
            }
            else {
                let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
                var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
                dates.push({ date: localISOTime, complete: 'none' });
                const newHabit = new Habit({
                   content,
                    dates
                });
    
               
                newHabit
                    .save()
                    .then(habit => {
                        console.log(habit);
                        res.redirect('back');
                    })
                    .catch(err => console.log(err));
            }
             
        })
}

// Habit Status Update per Days
module.exports.habitStatus = async function(req, res) {
    var d = req.query.date;
        var id = req.query.id;
        Habit.findById(id)
            .then(habit => {
                let dates = habit.dates;
                let found = false;
                dates.find(function (item, index) {
                    if (item.date === d) {
                        if (item.complete === 'done') {
                            item.complete = 'not done';
                        }
                        else if (item.complete === 'not done') {
                            item.complete = 'none'
                        }
                        else if (item.complete === 'none') {
                            item.complete = 'done'
                        }
                        found = true;
                    }
                })
                if (!found) {
                    dates.push({ date: d, complete: 'done' })
                }
                habit.dates = dates;
                return habit.save();
            })
            .then(updatedHabit => {
                console.log(updatedHabit);
                res.redirect('back');
            })
            .catch(err => {
                console.error("Error updating habit status:", err);
                res.status(500).send(`Error updating habit status: ${err.message}`);
            });
}


// function handle add Habit
module.exports.addHabit = async function(req, res){
    console.log("Added the Habit");

    try{
        let newHabit = await Habit.create({
            content: req.body.content            
        });

        console.log("Successfully Added the task");
        return res.redirect('back')

    }catch(err){
        console.log("Error in Adding task", err);
        return res.redirect("back");

    }
}

//  function to handle deleting habit
module.exports.deleteHabit = async function (req, res) {
    try {
        const documentProduct = await Habit.findOneAndRemove({ _id: req.params.id });
        if (!documentProduct) {
            // Create an error object and respond with it
            const err = new Error("Habit not found");
            res.status(404).json({ error: err.message });
        } else {
            // Successfully deleted the habit, redirect to another route
            res.redirect('/');
        }
    } catch (error) {
        // Handle any other errors that might occur during deletion
        res.status(500).json({ error: error.message });
    }
};

