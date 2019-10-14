'use strict'; 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoPozoSchema = Schema({
    nombre: String
});
var EstadoPozo = mongoose.model('EstadoPozo', EstadoPozoSchema);

module.exports = EstadoPozo;