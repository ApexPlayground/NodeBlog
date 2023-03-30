const path = require('path');
const Post = require('../models/Post');
const showHomePage = async (req, res) => {
    const posts = await Post.find({});
    res.render('index', {posts});
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
    } catch (error) {
        console.log(error);
    }
}
const showPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {post});
}

module.exports = {
    showHomePage, createPost, storePost, showPost
}

