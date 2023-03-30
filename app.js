// Import the Express.js module and create an instance of it
const express = require('express');
const app = express();

// Import the edge module and configure it as the view engine
const { config, engine } = require('express-edge');

const expressFileUpload = require('express-fileupload');

const { showHomePage, createPost, storePost, showPost } = require('./controllers/PostController');

const { createUser, storeUser, showLogin } = require('./controllers/UserController');

app.use(engine);

// Set the directory where the application's views are located
app.set('views', `${__dirname}/views`);

const db = require('./db');

// Serve static files located in the "public" folder
app.use(express.static('public'));

app.use(express.json());

app.use(expressFileUpload());

app.use(express.urlencoded({ extended: true }));





// Set up a route for the root URL that renders the "index" view
app.get('/', showHomePage);

app.get('/posts/new', createPost);

app.post('/posts/store', storePost);

app.get('/posts/:id', showPost);

app.get('/auth/register', createUser);

app.post('/auth/register', storeUser);

app.get('/auth/login', showLogin);



// Start the web server on port 3000 and log a message to the console
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
