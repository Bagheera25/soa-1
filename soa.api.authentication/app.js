const express = require('express');
const app = express();
const db = require('./configs/db.config');

const AuthController = require('./controllers/auth.controller');
app.use('/api/auth', AuthController);

module.exports = app;