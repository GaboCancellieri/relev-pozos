'use strict'

var express = require('express');
var api = express.Router();
var PozoController = require('../controllers/pozo');

// GETS
api.get('/',PozoController.getPozos);
api.get('/:idPozo',PozoController.getPozo);
api.get('/conteo/etapa',PozoController.getConteoEtapa);
api.get('/conteo/semanal/etapa/:semana',PozoController.getConteoSemanal);
api.get('/conteo/acumulado/etapa',PozoController.getConteoAcumulado);
api.get('/conteo/acumulado/por/etapa/:etapa',PozoController.getConteoAcumuladoPorEtapa);
api.get('/conteo/:nomRelev/:semana',PozoController.getPozosRelevadorSemanal);
api.get('/conteo/mes/por/relevador/:nomRelev',PozoController.getConteoPorMesRelevador);
api.get('/conteo/acumulado/general/por/mes/',PozoController.getConteoPorMesGeneral);

// PATCH MODIFICACION
api.patch('/:idPozo',PozoController.editarPozo);

// POST ALTA
api.post('/',PozoController.cargarPozo);

// DELETE
api.delete('/:idPozo', PozoController.eliminarPozo)

module.exports = api; 