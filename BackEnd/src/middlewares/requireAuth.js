// To check the validity of JWT
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = mongoose.model('User');

// To check if the user is signed in
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === Bearer ${token}

    if(!authorization) {
        return res.status(401).send({error: 'You must be logged in.'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if(err) {
            return res.status(401).send({error: 'You must be logged in.'});
        }

        const { userId } = payload;
        const user = await Users.findById(userId);
        req.user = user;
        next();
    })
}