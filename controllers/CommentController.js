// Require the path module to work with file paths
const path = require('path');

const Comment = require('../models/Comments');


// Define an async function to store a new post in the database
const storeComment = async (req, res) => {
    try {
    
        // Create a new comment in the database with the form data 
        await Comment.create({
            ...req.body,
        });

        // Redirect to the post page
        res.redirect('/posts/' + req.body.postId);
    } catch (error) {
        // If there is an error, log it to the console
        console.log(error);
    }
}


// Define an async function to show comments
const showComments = async (req, res) => {
    try {
      // Find the comment with the specified ID in the database
      const comment = await Comment.findById(req.params.id);
  
      // Render the comments template and pass in the post and comments data
      res.render('comments', {comment});
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  module.exports = {
    storeComment,showComments
}
  