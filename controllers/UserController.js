// Import the necessary modules
const bcrypt = require('bcrypt');
const User = require('../models/User');
const createUser = (req, res) => {
    res.render('create-user');
};
const storeUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
const showLogin= (req, res) => {
    res.render('loging.edge');

};

module.exports = {
  createUser,
  storeUser,
  showLogin
};