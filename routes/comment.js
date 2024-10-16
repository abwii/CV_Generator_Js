const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.post('/add', commentController.addComment);
router.delete('/delete/:commentId', commentController.deleteComment);

module.exports = router;