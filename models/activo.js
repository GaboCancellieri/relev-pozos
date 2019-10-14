'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var ActivoSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Activo = mongoose.model('Activo', ActivoSchema);

module.exports = Activo;