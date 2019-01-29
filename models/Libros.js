const mongoose = require('mongoose');

const libroSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    edicion: {
        type: Number,
        required: true
    }
}, {collection: 'libros'});

module.exports = mongoose.model('Libro', libroSchema);