const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');

// konfigurasi express
const app = express();

// konfigurasi mongo db
require('./utils/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

// konfigurasi agar tidak kena CORS Origin
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

// konfigurasi method APIS
app.use('/api/posts', postRoutes);

module.exports = app;