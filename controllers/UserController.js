const bcrypt = require('bcrypt');
const User = require('../models/User');

// Render the view to create a new user
const createUser = (req, res) => {
  res.render('create-user');
};

// Save the new user data to the database
const storeUser = async (req, res) => {
   User.create(req.body, (error, user) => {
    res.redirect('/');
   });
};

// Render the login view
const showLogin = (req, res) => {
  res.render('login');
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if(result){
            res.redirect('/');
        }else{
            res.redirect('/auth/login')
        }
    }
};

module.exports = {
  createUser,
  storeUser,
  showLogin,
  loginUser
};
