const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: {
    type: String, // Change the type to string
    ref: "Post",
  },
  comment: {
    type: String,
  },
});

CommentSchema.add({
  createdAt: {
    type: Date,
    default: Date.now,
},
});

CommentSchema.add({
  createdAt: {
    type: Date,
    default: Date.now,
},
});


const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
