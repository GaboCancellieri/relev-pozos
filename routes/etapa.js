'use strict'

var express = require('express');
var api = express.Router();
var EtapaController = require('../controllers/etapa');

// GETS
api.get('/',EtapaController.getEtapas);
api.get('/:idEtapa',EtapaController.getEtapa);

// PATCH MODIFICACION
api.patch('/:idEtapa',EtapaController.editarEtapa);

// POST ALTA
api.post('/',EtapaController.cargarEtapa);

// DELETE
api.delete('/:idEtapa', EtapaController.eliminarEtapa)

module.exports = api; 