const mongoose = require('mongoose');

const SigneeModel = mongoose.Schema({

    "fullName": {
        "type": String,
    },
    "email": {
        type: String,
    }

});

module.exports = mongoose.model('Signee', SigneeModel);