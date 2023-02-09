const jwt = require('jsonwebtoken');

const getSignedToken = (id) => 
    jwt.sign(id, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
module.exports = { getSignedToken };