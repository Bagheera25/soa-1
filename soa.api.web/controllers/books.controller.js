const express = require('express');
const bodyParser = require('body-parser');
const config = require('../configs/global.config');
const http = require('restler');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const TokenInterceptor = require('../interceptors/token.interceptor');
const Book = require('../models/book.model');
const BookNomadAdapter = require('../adapters/book-nomads.adapter');

router.get('/', TokenInterceptor, function (req, res, next) {
    // inner db call
    Book.find({
        isbn: req.query.isbn
    }, (err, books) => {
        let responseBooks = [];
        if (err) {
            responseBooks = [];
        } else {
            responseBooks = books;
        }

        // public API call
        http.get(`https://www.booknomads.com/api/v0/isbn/${req.query.isbn}`)
            .on('fail', () => {
                if (!responseBooks.length) {
                    return res.status(422).send({ books: [], message: 'We were unable to find the book you are looking for.' });
                }
            })
            .on('success', (data) => {
                const adapterBook = BookNomadAdapter.tranform(JSON.parse(data));
                responseBooks.push(adapterBook);

                // send success response
                return res.status(200).send({ books: responseBooks });
            });
    });
});

const FavoritesController = require('./books.favorites.controller');
router.use('/favorites', FavoritesController);

module.exports = router;