'use strict';

/**
 * Dependencias del modulo
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Relevador Schema
 */
var relevadorSchema = new Schema({
    nombre: String,
    apellido: String,
    telefono: String,
    mail: String,
    area: {
        type: Schema.Types.ObjectId,
        ref: 'Area'
    }
});


// El esquema solo no sirve. Luego, creamos el modelo
var Relevador = mongoose.model('Relevador', relevadorSchema);

module.exports = Relevador;