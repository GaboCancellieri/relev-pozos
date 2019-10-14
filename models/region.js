'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema Clinica
var RegionSchema = Schema({
    nombre: {
        type: String,
        unique: true
    }
});
var Region = mongoose.model('Region', RegionSchema);

module.exports = Region;