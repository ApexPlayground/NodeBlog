const User = require('../models/User');
const createUser = (req, res) => {

    res.render('add_user');
};
const storeUser = async(req,res) => {
    User.create(req.body, (error, user)=>{
        res.redirect('/')
    });
}

module.exports = {
    createUser, storeUser
}


