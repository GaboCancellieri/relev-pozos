'use strict'

var express = require('express');
var api = express.Router();
var AreaController = require('../controllers/area');

// GETS
api.get('/',AreaController.getAreas);
api.get('/:idArea',AreaController.getArea);

// PATCH MODIFICACION
api.patch('/:idArea',AreaController.editarArea);

// POST ALTA
api.post('/',AreaController.cargarArea);

// DELETE
api.delete('/:idArea', AreaController.eliminarArea)

module.exports = api; 