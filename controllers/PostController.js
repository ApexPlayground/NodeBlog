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
    // Check if the req.files object exists and if the image property exists
    if (req.files && req.files.image) {
        // If the file exists, save it to the "public/posts/images" directory
        const { image } = req.files;
        const imagePath = 'public/posts' + image.name;
        image.mv(imagePath, async (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred while uploading the image.');
            } else {
                // If the file is successfully saved, create a new post with the data from the request body
                const { title, body } = req.body;
                const post = new Post({ title, body, image: imagePath });
                try {
                    await post.save();
                    res.redirect('/');
                } catch (error) {
                    console.error(error);
                    res.status(500).send('An error occurred while creating the post.');
                }
            }
        });
    } else {
        // If the file doesn't exist, send an error response to the client
        res.status(400).send('No file was uploaded.');
    }
};

  

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
