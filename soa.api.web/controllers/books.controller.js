const express = require('express');
const bodyParser = require('body-parser');
const config = require('../configs/global.config');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const TokenInterceptor = require('../interceptors/token.interceptor');
const Book = require('../models/book.model');

router.get('/', TokenInterceptor, function (req, res, next) {
    Book.find({
        isbn: req.query.isbn
    }, (err, books) => {
        if (err) {
            return res.status(422).send({ books: [], message: "There was a problem finding the books." });
        }
        res.status(200).send({ books: books });
    });
});

const FavoritesController = require('./books.favorites.controller');
router.use('/favorites', FavoritesController);

module.exports = router;