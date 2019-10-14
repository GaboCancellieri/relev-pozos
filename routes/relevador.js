'use strict'

var express = require('express');
var api = express.Router();
var RelevadorController = require('../controllers/relevador');

// GETS
api.get('/',RelevadorController.getRelevadores);

// PATCH
api.patch('/:idRelevador',RelevadorController.editarRelevador);

// POST
api.post('/',RelevadorController.cargarRelevador);

// DELETE
api.delete('/:idRelevador', RelevadorController.eliminarRelevador)

module.exports = api;