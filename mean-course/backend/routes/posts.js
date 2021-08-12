const express = require('express');

const PostController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

// method APIs
router.post('', checkAuth, extractFile, PostController.savePost);

router.put('/:id', checkAuth, extractFile, PostController.updatePost);

router.get('', PostController.getAllPosts);

router.get('/:id', PostController.getPostById);

router.delete('/:id', checkAuth, PostController.deletePostById);


module.exports = router;