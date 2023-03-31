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
        // Extract the image file from the request
        const { image } = req.files;
        // Move the image file to the public/posts directory
        await image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));
        // Create a new post in the database with the data from the request
        await Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
        });
        // Redirect to the home page
        res.redirect('/');
    } catch (error) {
        // Handle any errors that occur
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

// Define a function that renders a post based on its ID
const showPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {post});
}

module.exports = {
    showHomePage, createPost, storePost, showPost
}

