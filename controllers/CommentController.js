const Comment = require('../models/Comment');
const Post = require('../models/Post');

const comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    const newComment = new Comment({
      post: req.params.id,
      comment: req.body.comment,
    });
    
    const result = await newComment.save();
    
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
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { comment: req.body.comment },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).send("Comment not found");
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.redirect(`/posts/${post.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error editing comment");
  }
};


const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).send("Comment not found");
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Remove comment id from post comments array
    post.comments = post.comments.filter(commentId => commentId && commentId.toString() !== deletedComment._id.toString());
    await post.save();

    res.redirect(`/posts/${post.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting comment");
  }
};


  
module.exports = {
  comment,editComment,deleteComment
};
