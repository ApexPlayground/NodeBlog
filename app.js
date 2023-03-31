// Import the Express.js module and create an instance of it
const express = require('express');
const app = express();

// Import the edge module and configure it as the view engine
const { config, engine } = require('express-edge');
app.use(engine);

// Set the directory where the application's views are located
app.set('views', `${__dirname}/views`);

// Import middleware modules
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

// Serve static files located in the "public" folder
app.use(express.static('public'));

// Set up middleware for handling JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import controller modules
const { showHomePage, createPost, storePost, showPost } = require('./controllers/PostController');
const { createUser, storeUser, showLogin, loginUser } = require('./controllers/UserController');

// Set up routes
app.get('/', showHomePage); // Route for the root URL that renders the "index" view
app.get('/posts/new', createPost); // Route for the "new post" page
app.post('/posts/store', storePost); // Route for storing a new post
app.get('/posts/:id', showPost); // Route for showing a specific post
app.get('/auth/register', createUser); // Route for the "register" page
app.post('/auth/register', storeUser); // Route for storing a new user
app.get('/auth/login', showLogin); // Route for the "login" page
app.post('/auth/login', loginUser);// Route to handle login form submission 

// Set up middleware for handling file uploads
app.use(expressFileUpload());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the web server on port 3000 and log a message to the console
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
