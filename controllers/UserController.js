const User = require('../models/User');

// Render the view to create a new user
const createUser = (req, res) => {
  res.render('create-user');
};

// Save the new user data to the database
const storeUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Render the login view
const showLogin = (req, res) => {
  res.render('login');
};

module.exports = {
  createUser,
  storeUser,
  showLogin
};
