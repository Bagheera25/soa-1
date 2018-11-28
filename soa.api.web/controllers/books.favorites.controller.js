const express = require('express');
const bodyParser = require('body-parser');
const config = require('../configs/global.config');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const TokenInterceptor = require('../interceptors/token.interceptor');

router.get('/', TokenInterceptor, (req, res, next) => {
    res.status(200).send(req.userId);
});

router.post('/', TokenInterceptor, (req, res, next) => {
    res.status(200).send(req.userId);
});

router.put('/:isbn', (req, res, next) => {
    res.status(200).send(req.userId);
});

module.exports = router;