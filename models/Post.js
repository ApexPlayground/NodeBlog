const mongoose = require("mongoose");
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

   

});

PostSchema.add({
    content: {
        type: String,
        required: true,
    },
})

const Post = mongoose.model("Post", PostSchema);
console.log(Post);
module.exports = Post;