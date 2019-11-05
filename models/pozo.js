'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Coordenadas = new Schema({
    latitud: String,
    longitud: String
});

var Estado = new Schema({
	fecha: Date,
	estadoPozo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoPozo'
    }
});


//Esquema Clinica
var PozoSchema = Schema({
    nombre: {
        type: String,
        unique: true
    },
    fechaRelevo: Date,
    coordenadas: Coordenadas,
    etapa: String,
    estado: Estado,
    relevador: {
        type: Schema.Types.ObjectId,
        ref: 'Relevador'
    },
    areaConcesion: String,
    areaReserva: String,
    activo: String,
    yacimiento: String,
    region: String,
    zona: String,
    provincia: String,
    operacion: String,
    tomaPresion: Boolean,
    servidumbres: Boolean
});
var Pozo = mongoose.model('Pozo', PozoSchema);

module.exports = Pozo;