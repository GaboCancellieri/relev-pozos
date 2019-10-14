'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var OperacionSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Operacion = mongoose.model('Operacion', OperacionSchema);

module.exports = Operacion;