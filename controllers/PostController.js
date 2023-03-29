const path = require('path');
const Post = require('../models/Post');
const showHomePage = (req, res) => {
    res.render('index');
}
const createPost = (req, res) => {
    res.render('add_post');
}
const storePost = async (req, res) => {
    try {
        const { image } = req.files;
        await image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));
        await Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
        });
        res.redirect('/');
        //post.create(req.body);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    showHomePage, createPost, storePost
}

