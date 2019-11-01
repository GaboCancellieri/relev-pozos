'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var ZonaSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Zona = mongoose.model('Zona', ZonaSchema);

module.exports = Zona;