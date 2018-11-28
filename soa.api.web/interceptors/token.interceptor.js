const jwt = require('jsonwebtoken');
const config = require('../configs/global.config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.sendStatus(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, config.authKey, function (err, decoded) {
        if (err) {
            return res.sendStatus(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;