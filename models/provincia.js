'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var ProvinciaSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Provincia = mongoose.model('Provincia', ProvinciaSchema);

module.exports = Provincia;