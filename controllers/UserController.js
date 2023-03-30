const User = require('../models/User');
const createUser = (req, res) => {
    res.render('create-user');
};
const storeUser = async (req, res) => {
    User.create(req.body,(error, user) => {
        res.redirect('/');
    });
};
const showLogin= (req, res) => {
    res.render('loging.edge');

};

module.exports ={
    createUser, storeUser, showLogin
};