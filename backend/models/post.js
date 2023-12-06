const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    price: {type: Number, require: true},
    client: { type: String, require: true}, // Nuevo campo de tipo arreglo de cadenas
    imagePath: {type:String, require: true}
})

module.exports = mongoose.model('Post', postSchema);
