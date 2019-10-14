'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var AreaSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Area = mongoose.model('Area', AreaSchema);

module.exports = Area;