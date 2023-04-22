// Import the necessary modules
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Define a function to render the create-user form
const createUser = (req, res) => {
  res.render("create-user");
};

// Define an async function to store a new user in the database
const storeUser = async (req, res) => {
  try {
    // Create a new user in the database with the form data
    await User.create(req.body);

    // Redirect to the home page
    res.redirect("/");
  } catch (error) {
    // If there is an error, log it to the console and send an error response
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Define a function to render the login form
const showLogin = (req, res) => {
  res.render("login");
};

// Define an async function to log in a user
const loginUser = async (req, res) => {
  try {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Find the user with the specified email in the database
    const user = await User.findOne({ email });

    // If the user is found, compare the password with the hashed password in the database
    if (user) {
      const result = await bcrypt.compare(password, user.password);

      // If the password is correct, set the user ID in the session and redirect to the home page
      if (result) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        // If the password is incorrect, redirect to the login page
        res.redirect("/auth/login");
      }
    } else {
      // If the user is not found, redirect to the login page
      res.redirect("/auth/login");
    }
  } catch (error) {
    // If there is an error, log it to the console
    console.log(error);
  }
};

// Define a function to log out a user
const logoutUser = (req, res) => {
  // Destroy the session and redirect to the home page
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// Export the createUser, storeUser, showLogin, loginUser, and logoutUser functions
module.exports = {
  createUser,
  storeUser,
  showLogin,
  loginUser,
  logoutUser
};
