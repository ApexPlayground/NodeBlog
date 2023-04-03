const mongoose = require("mongoose");

// Create a new schema for the post model
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    comment: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ]
});

// Add a "content" field to the PostSchema
PostSchema.add({
    content: {
        type: String,
        required: true,
    },
});

// Create a new model for the post using the schema defined above
const Post = mongoose.model("Post", PostSchema);

// Export the Post model for use in other files
module.exports = Post;
