// Import the necessary modules
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Render the view to create a new user
const createUser = (req, res) => {
  res.render('create-user');
};

// Save the new user data to the database
const storeUser = async (req, res) => {
   try {
     // Create a new user with the data from the request body
     const user = await User.create(req.body);
     // Redirect to the home page if the user is successfully created
     res.redirect('/');
   } catch (error) {
     // Log the error and send an error response to the client if there's an error
     console.error(error);
     res.status(500).send('An error occurred while creating the user.');
   }
};

// Render the login view
const showLogin = (req, res) => {
  res.render('login');
};

// Authenticate the user's credentials
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    // Find the user with the given email address
    const user = await User.findOne({email});
    if (user) {
        // Compare the user's password hash with the entered password
        const result = await bcrypt.compare(password, user.password);
        if(result){
            // Redirect to the home page if the user is authenticated
            res.redirect('/');
        }else{
            // Redirect to the login page if the password is incorrect
            res.redirect('/auth/login')
        }
    }
};

// Export the functions as an object
module.exports = {
  createUser,
  storeUser,
  showLogin,
  loginUser
};
