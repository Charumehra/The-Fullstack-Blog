const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.get('/', PostController.getPosts);
router.get('/top', PostController.getTopPosts);
router.post('/', PostController.createPost);
router.delete('/:id', PostController.deletePost);

module.exports = router;