const express = require('express');
const bodyParser = require('body-parser');
const config = require('../configs/global.config');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const TokenInterceptor = require('../interceptors/token.interceptor');

router.get('/', TokenInterceptor, function (req, res, next) {
    res.status(200).send(req.userId);
});

const FavoritesController = require('./books.favorites.controller');
router.use('/favorites', FavoritesController);

module.exports = router;