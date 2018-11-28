const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../configs/global.config');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../models/user.model');

router.post('/register', function (req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, (err, user) => {
        if (err) {
            return res.sendStatus(500).send("There was a problem registering the user.");
        }
        // create a token
        const token = jwt.sign({ id: user._id }, config.authKey, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.sendStatus(200).send({ token: token });
    });

});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.sendStatus(401).send({ message: 'Username or password is invalid' });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.sendStatus(401).send({ message: 'Username or password is invalid' });
        }

        // get authentication token
        const token = jwt.sign({ id: user._id }, config.authKey, {
            expiresIn: config.authExp
        });
        return res.sendStatus(200).send({ token: token });
    });
});

module.exports = router;