const path = require('path');
const Post = require('../models/Post');

// Define a function that renders the home page and displays all posts
const showHomePage = async (req, res) => {
    try {
        // Find all posts in the database
        const posts = await Post.find({});
        // Render the home page and pass the posts as a parameter
        res.render('index', { posts });
    } catch (error) {
        // Handle any errors that occur
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

// Define a function that renders the "add post" page
const createPost = (req, res) => {
    // Render the "add post" page
    res.render('add_post');
}

// Define a function that stores a new post in the database
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
    try {
        // Find the post in the database based on its ID
        const post = await Post.findById(req.params.id);
        // Render the post page and pass the post as a parameter
        res.render('post', { post });
    } catch (error) {
        // Handle any errors that occur
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

// Export the functions for use in other files
module.exports = {
    showHomePage,
    createPost,
    storePost,
    showPost
}
