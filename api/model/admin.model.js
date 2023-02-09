const mongoose = require('mongoose');

const adminModel = mongoose.Schema({

    "id": {
        "type": String,
    },
    "token": {
        "type": Double,
    },
    "email": {
        type: String,
    },
    "password":{
        "type":String
    }

});

module.exports = mongoose.model('Admin', adminModel);