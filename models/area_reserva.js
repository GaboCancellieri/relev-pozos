'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var Area_ReservaSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Area_Reserva = mongoose.model('Area_Reserva', Area_ReservaSchema);

module.exports = Area_Reserva;