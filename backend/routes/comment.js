const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const { verifyUser } = require("../middlewares/jwt");

router.post('/add', verifyUser, commentController.addComment);
router.delete('/delete/:id', verifyUser, commentController.deleteComment);
router.get('/all/:id', verifyUser, commentController.getAllComments);

module.exports = router;