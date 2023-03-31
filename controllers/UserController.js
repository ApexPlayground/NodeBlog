// Import the necessary modules
const bcrypt = require("bcrypt");
const User = require("../models/User");
const createUser = (req, res) => {
  res.render("create-user");
};
const storeUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
const showLogin = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/auth/login");
      }
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  createUser,
  storeUser,
  showLogin,
  loginUser,
  logoutUser
};
