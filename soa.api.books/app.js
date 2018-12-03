const express = require('express');
const app = express();
const db = require('./configs/db.config');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

const BooksController = require('./controllers/books.controller');
app.use('/api/books', BooksController);

module.exports = app;