const express = require('express');
const bodyParser = require('body-parser');

// konfigurasi mongo db
require('./utils/db');
const PostModel = require('./models/post');

// konfigurasi express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// konfigurasi CORS Origin
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


// method APIS
app.post('/api/posts', (req, res, next) => {
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
app.put('/api/posts/:id', (req, res, next) => {
    const post = new PostModel({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    PostModel.updateOne({ _id: req.params.id }, post)
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Update successfuly' });
        });
});
app.get('/api/posts', (req, res, next) => {
    PostModel.find()
        .then((documents) => {
            res.status(200).json({
                message: 'post fetched succesfully',
                posts: documents
            });
        });
});
app.get('/api/posts/:id', (req, res, next) => {
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
app.delete('/api/posts/:id', (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Post deleted!'
        });
    });
});

module.exports = app;