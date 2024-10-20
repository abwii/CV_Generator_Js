const { verifyComment } = require('../validator/comment');
const CommentModel = require('../models/Comment');
const { convertToCustomFormat } = require('../utils/cv');

exports.addComment = async (req, res) => {
  const { content, user, cv } = req.body;

  verifyComment(req.body);

  const newComment = new CommentModel({
    content,
    user,
    cv
  });

  newComment.save()
    .then(savedComment => {
      const formattedCreatedAt = convertToCustomFormat(savedComment.createdAt);  
      const formattedUpdatedAt = convertToCustomFormat(savedComment.updatedAt);  

      res.status(201).json({
        message: 'Comment successfully added',
        comment: {
          ...savedComment._doc,  
          createdAt: formattedCreatedAt,
          updatedAt: formattedUpdatedAt
        }
      });
    })
  .catch(error => {
    console.error(error); 
    res.status(500).json({ error: 'Error adding comment' });
  });
};

exports.deleteComment = (req, res) => {

  const commentId = req.params.id;

  CommentModel.findByIdAndDelete(commentId)
    .then(deletedComment => {
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment successfully deleted' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error deleting comment' });
    });
};

exports.getAllComments = (req, res) => {
  const cvId = req.params.id;
  CommentModel.find({ cv: cvId })
      .populate('user', 'firstname lastname')
      .then((comments) => {
          if (comments.length === 0) {
              return res.status(404).send({
                  message: 'No comments found'
              });
          }

          const formattedComments = comments.map(comment => ({
              content: comment.content,
              user: {
                  firstname: comment.user.firstname,
                  lastname: comment.user.lastname
              },
              createdAt: convertToCustomFormat(comment.createdAt),
              updatedAt: convertToCustomFormat(comment.updatedAt) 
          }));

          res.send(formattedComments);
      })
      .catch((error) => {
          res.status(500).send({
              message: error.message
          });
      });
};