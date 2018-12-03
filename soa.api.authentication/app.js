const express = require('express');
const app = express();
const db = require('./configs/db.config');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const AuthController = require('./controllers/auth.controller');
app.use('/api/auth', AuthController);

module.exports = app;