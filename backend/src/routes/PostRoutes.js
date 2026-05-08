const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const upload = require('../middleware/upload');

router.get('/', PostController.getPosts);
router.get('/top', PostController.getTopPosts);
router.post('/', upload.single('image'), PostController.createPost);
router.delete('/:id', PostController.deletePost);

module.exports = router;