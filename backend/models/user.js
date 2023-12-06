const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true},
    email: {type: String, require: true},
    imagePath: {type: String, require: true},
    isVerified: {type: Boolean, default: false}, //agregar campo si esta verificado

    //AUT
    //isVerified: {type: Boolean, default: false}
    //isVerif: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', userSchema);