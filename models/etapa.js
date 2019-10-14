'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var EtapaSchema = Schema({
    nombre: {
        type: String,
        unique: true
    },
    fechaLimite: Date
});
var Etapa = mongoose.model('Etapa', EtapaSchema);

module.exports = Etapa;