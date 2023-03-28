// Import the Express.js module and create an instance of it
const express = require('express');
const app = express();

// Import the express-edge module and configure it as the view engine
const {config, engine} = require('express-edge');
app.use(engine);

const {showHomePage} = require('./controllers/PostController');

const db = require('./db');

// Serve static files located in the "public" folder
app.use(express.static('public'));

// Set the directory where the application's views are located
app.set('views', `${__dirname}/views`);

// Set up a route for the root URL that renders the "index" view
app.get('/', showHomePage);

// Start the web server on port 3000 and log a message to the console
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
