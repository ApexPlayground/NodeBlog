// Import the Express.js module and create an instance of it
const express = require("express");
const app = express();

// Import the edge module and configure it as the view engine
const { config, engine } = require("express-edge");

// Import the express-fileupload module to handle file uploads
const expressFileUpload = require("express-fileupload");

// Import the express-session module to handle sessions
const session = require("express-session");

// Import the connect-mongo module to store session data in MongoDB
const MongoStore = require("connect-mongo");

// Import controllers for handling requests
const {
  showHomePage,
  createPost,
  storePost,
  showPost,
} = require("./controllers/PostController");

const {
  createUser,
  storeUser,
  showLogin,
  loginUser,
} = require("./controllers/UserController");

// Import auth middleware
const { authenticateUser } = require("./middlewares/auth");

// Import the database connection
const db = require("./db");

// Serve static files located in the "public" folder
app.use(express.static("public"));

// Parse incoming JSON data
app.use(express.json());

// Handle file uploads
app.use(expressFileUpload());

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Configure the Edge.js template engine
app.use(engine);

// Set the directory where the application's views are located
app.set("views", `${__dirname}/views`);

// Add the 'session' middleware to the application, with the following options:
app.use(
  session({
    // Secret used to sign the session ID cookie, should be kept secret
    secret: "secret",

    // Whether to save the session data back to the session store, even if the session wasn't modified during the request
    resave: false,

    // Whether to save a new session for a client that has not yet established a session
    saveUninitialized: false,

    // The session store to use for storing session data, using 'connect-mongo' to store in a MongoDB database
    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/NodeBlog", // URL for connecting to the MongoDB database
    }),
  })
);

// Set up a route for the root URL that renders the "index" view
app.get("/", showHomePage);

// Set up a route for creating a new post
app.get("/posts/new", createPost);

// Set up a route for storing a new post in the database
app.post("/posts/store", storePost);

// Set up a route for showing a specific post
app.get("/posts/:id", showPost);

// Set up routes for user authentication
app.get("/auth/register", createUser);
app.post("/auth/register", storeUser); // Route for storing a new user
app.get("/auth/login", authenticateUser, showLogin); // Route for the "login" page
app.post("/auth/login", loginUser); // Route to handle login form submission

// Start the web server on port 3000 and log a message to the console
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
