const Comment = require('../models/Comment');

// Define an async function to store a new user in the database
const storeComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const newComment = new Comment({ comments: comment });
      const result = await newComment.save();
      console.log("Comment stored in the database:", result);
      res.redirect('/');
    } catch (error) {
      console.error("Error storing comment in the database:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  

  const getAllComments = async (req, res) => {
    try {
      const comments = await Comment.find({}, { comments: 1, _id: 0 });
      console.log("All comments retrieved from the database:", comments);
      res.render('post', { comments });
    } catch (error) {
      console.error("Error retrieving comments from the database:", error);
      res.render('error', { error });
    }
  };
  




module.exports = {
    storeComment,getAllComments
}

