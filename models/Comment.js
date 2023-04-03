const mongoose = require("mongoose");

// Create a new schema for the post model
const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
    comments: {
        type: String,
    }
});
// Add a "content" field to the PostSchema



// Create a new model for the post using the schema defined above
const Comment = mongoose.model("Comment", CommentsSchema);

// Export the Post model for use in other files
module.exports = Comment;

