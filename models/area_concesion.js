'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var Area_ConcesionSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Area_Concesion = mongoose.model('Area_Concesion', Area_ConcesionSchema);

module.exports = Area_Concesion;