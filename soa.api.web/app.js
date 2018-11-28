const express = require('express');
const app = express();
const db = require('./configs/db.config');

const BooksController = require('./controllers/books.controller');
app.use('/api/books', BooksController);

module.exports = app;