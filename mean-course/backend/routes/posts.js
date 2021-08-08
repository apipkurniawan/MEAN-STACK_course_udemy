const express = require('express');
const PostModel = require('../models/post');
const multer = require('multer');

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

// method APIS
router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfuly!',
            postId: createdPost._id
        });
    });
});

router.put('/:id', (req, res, next) => {
    const post = new PostModel({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    PostModel.updateOne({ _id: req.params.id }, post)
        .then(result => {
            res.status(200).json({ message: 'Update successfuly' });
        });
});

router.get('', (req, res, next) => {
    PostModel.find()
        .then((documents) => {
            res.status(200).json({
                message: 'post fetched succesfully',
                posts: documents
            });
        });
});

router.get('/:id', (req, res, next) => {
    PostModel.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'post not found'
                });
            }
        });
});

router.delete('/:id', (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Post deleted!'
        });
    });
});

module.exports = router;