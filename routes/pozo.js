'use strict'

var express = require('express');
var api = express.Router();
var PozoController = require('../controllers/pozo');

// GETS
api.get('/',PozoController.getPozos);
api.get('/:idPozo',PozoController.getPozo);
api.get('/conteo/etapa',PozoController.getConteoEtapa);
api.get('/conteo/semanal/etapa',PozoController.getConteoSemanal);
api.get('/conteo/acumulado/etapa',PozoController.getConteoAcumulado);

// PATCH MODIFICACION
api.patch('/:idPozo',PozoController.editarPozo);

// POST ALTA
api.post('/',PozoController.cargarPozo);

// DELETE
api.delete('/:idPozo', PozoController.eliminarPozo)

module.exports = api; 