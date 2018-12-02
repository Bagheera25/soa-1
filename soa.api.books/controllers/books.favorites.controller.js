const express = require('express');
const bodyParser = require('body-parser');
const config = require('../configs/global.config');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const TokenInterceptor = require('../interceptors/token.interceptor');
const Favorite = require('../models/favorite.model');

router.get('/', TokenInterceptor, (req, res, next) => {
    // TODO: add external api integration
    Favorite
        .find({})
        .populate('book')
        .exec((err, books) => {
            if (err) {
                return res.status(422).send({ books: [], message: "There was a problem finding the books." });
            }
            res.status(200).send({ books: books });
        });
});

router.post('/', TokenInterceptor, (req, res, next) => {
    Favorite.create({
        isbn: req.body.isbn,
        userId: req.userId
    }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(422).send({ message: "Unable to add to favorite" });
        }
        res.status(200).send({ message: "Book added to favorites with success" });
    });
});

router.delete('/:isbn', TokenInterceptor, (req, res, next) => {
    Favorite.deleteOne({
        isbn: req.params.isbn,
        userId: req.userId
    }, (err) => {
        if (err) {
            return res.status(422).send({ message: "Unable to remove book from favorite" });
        }
        res.status(200).send({ message: "Book removed from favorites with success" });
    })
});

module.exports = router;