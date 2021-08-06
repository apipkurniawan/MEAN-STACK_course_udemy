const express = require('express');

const app = express();

// konfigurasi utk menghindari terjadinya CORS
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


// method API
app.post('/api/posts', (req, res, next) => {

});
app.use('/api/posts', (req, res, next) => {
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