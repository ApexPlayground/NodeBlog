const Post = require('../models/Post');
const showHomePage = (req, res) => {
    res.render('index');
}
const createPost = (req, res) => {
    res.render('add_post');
}
const storePost = async (req,res) => {
    try{
        console.log(req.body);
        res.redirect('/');
        //post.create(req.body);
    } catch (error){
        console.log(error);
    }
}

module.exports = {
    showHomePage,createPost,storePost
}

