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
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


// method APIS
app.post('/api/posts', (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save()
    res.status(201).json({
        message: 'Post added successfuly'
    });
});
app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'gsvwt727vh',
            title: 'first server-side post',
            content: 'this is comming from server'
        },
        {
            id: 'gsvwt727vh',
            title: 'second server-side post',
            content: 'this is second comming from server'
        }
    ];
    res.status(200).json({
        message: 'post fetched succesfully',
        posts
    });
});

module.exports = app;