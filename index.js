const express = require('express');
const app = express();
const port = 8000;

// database config using Mongoose
const db = require('./config/mongoose');

// Middleware for Parse data from forms
app.use(express.urlencoded({ extended: true }));


// set up and view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// static files for assets directory
app.use(express.static('./assets'));


// middleware use express router
app.use('/', require('./routes/router.js'));

// Start the server and listen on the specified port
app.listen(port, function(err) {
    if(err){
        console.log(`Error in running the server: ${err}`);
        }
        console.log(`Successfully running on port : ${port}`);
});
