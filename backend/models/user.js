const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true},
    email: {type: String, require: true},
    isVerified: {type: Boolean}, //agregar campo si esta verificado
    imagePath: {type: String, require: true},
    //computadoras: { type: [String], default: [] }, // Nuevo campo de tipo arreglo de cadenas
    
    
    //AUT
    //isVerified: {type: Boolean, default: false}
    //isVerif: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', userSchema);