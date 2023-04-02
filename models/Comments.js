const mongoose = require("mongoose");

// Create a new schema for the comment model
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

// Create a new model for the comment using the schema defined above
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model for use in other files
module.exports = Comment;
