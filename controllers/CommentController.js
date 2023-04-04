const Comment = require('../models/Comment');
const Post = require('../models/Post');

const comment = async (req, res) => {
  try {
    const newComment = new Comment({
      post: req.params.id,
      comment: req.body.comment,
    });
    
    const result = await newComment.save();
    
    const post = await Post.findById(req.params.id);
    post.comments.push(result._id);
    await post.save();
  
    const populatedPost = await Post.findById(req.params.id).populate('comments');
  
    console.log('=====comments=========')
    console.log(post.comments);
    console.log(result);
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/posts/${req.params.id}?error=saveError`);
  }
};

const editComment = async (req, res) => {

}

const deleteComment = async (req, res) => {

}
  
module.exports = {
  comment,editComment,deleteComment
};
