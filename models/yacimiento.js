'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var YacimientoSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Yacimiento = mongoose.model('Yacimiento', YacimientoSchema);

module.exports = Yacimiento;