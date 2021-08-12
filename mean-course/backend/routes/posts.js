const express = require('express');
const multer = require('multer');

const PostController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

// konfigurasi penyimpanan image
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('inValid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${name}-${Date.now()}.${ext}`);
    }
});

// method APIs
router.post('', checkAuth, multer({ storage: storage }).single('image'), PostController.savePost);

router.put('/:id', checkAuth, multer({ storage: storage }).single('image'), PostController.updatePost);

router.get('', PostController.getAllPosts);

router.get('/:id', PostController.getPostById);

router.delete('/:id', checkAuth, PostController.deletePostById);


module.exports = router;