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
    coordenadas: Coordenadas,
    etapa: {
        type: Schema.Types.ObjectId,
        ref: 'Etapa'
    },
    estado: Estado,
    relevador: {
        type: Schema.Types.ObjectId,
        ref: 'Relevador'
    },
    areaConcesion: {
        type: Schema.Types.ObjectId,
        ref: 'Area_Concesion'
    },
    areaReserva: {
        type: Schema.Types.ObjectId,
        ref: 'Area_Reserva'
    },
    activo: {
        type: Schema.Types.ObjectId,
        ref: 'Activo'
    },
    yacimiento: {
        type: Schema.Types.ObjectId,
        ref: 'Yacimiento'
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    },
    provincia: {
        type: Schema.Types.ObjectId,
        ref: 'Provincia'
    }
});
var Pozo = mongoose.model('Pozo', PozoSchema);

module.exports = Pozo;