// Require the path module to work with file paths
const path = require('path');

// Require the Post model
const Post = require('../models/Post');

// Define an async function to show the home page with all the posts
const showHomePage = async (req, res) => {
   // Find the 10 most recent posts in the database
   const posts = await Post.find({}).sort({ createdAt: -1 }).limit(5);

    // Render the home page template and pass in the posts
    res.render('index', { posts });
}

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" });
      res.render("allPosts", { posts });
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  };


// Define a function to render the form for creating a new post
const createPost = (req, res) => {
    // Render the add_post template
    res.render('add_post');
}

// Define an async function to store a new post in the database
const storePost = async (req, res) => {
    try {
        // Check if a file was uploaded with the request
        if (!req.files || !req.files.image) {
            throw new Error('No image file uploaded');
        }

        // Get the image file from the request
        const { image } = req.files;

        // Move the image file to the public/posts folder
        await image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));

        // Create a new post in the database with the form data and the image file path
        await Post.create({
            ...req.body,
            image: `/posts/${image.name}`,
        });

        // Redirect to the home page
        res.redirect('/');
    } catch (error) {
        // If there is an error, log it to the console
        console.log(error);
    }
}

// function to showPost to the page 
const showPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('comments');
      const comments = post.comments; // Get the comments from the post
  
      res.render('post', { post, comments }); // Pass the comments to the view
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  };
  

// Define an async function to delete a post from the database
const deletePost = async (req, res)=> {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting post");
    }
};

// Define an async function to edit a post from the database
const editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit_post', { post: post });
    } catch (err) {
        console.log(err);
    }
};
// Define an async function to update a post
const updatePost = async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          content: req.body.content,
          image: req.body.image
        },
        { new: true } // to return the updated document
      );
  
      res.redirect('/posts/' + updatedPost._id);
    } catch (err) {
      console.log(err);
      res.redirect('/posts/' + req.params.id + '/edit');
    }
  };

// Require the express-fileupload middleware to handle file uploads
const fileUpload = require('express-fileupload');

  




// Export the showHomePage, createPost, storePost, and showPost functions
module.exports = {
    showHomePage, createPost, storePost, showPost, deletePost, editPost, updatePost, getAllPosts
}
