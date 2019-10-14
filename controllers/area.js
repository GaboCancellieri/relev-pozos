'use strict'

var Area = require('../models/area');

// FUNCIONES
function getAreas(req, res){
    Area.find({}, function (err, areas) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!areas) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: areas
        });
    });
}

function getArea(req, res){
    Area.findById({'_id': req.params.idArea})
    .populate('medicos')
    .exec(function (err, area) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!area) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: area
        });
    });
}

function cargarArea(req, res) {
    if (!req.body.nombreArea) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
  
    var nuevoArea = new Area({
        nombre: req.body.nombreArea,  
    })

    nuevoArea.save().then(function (nuevoArea) {
        res.status(201).json({
            message: 'Area creado',
            obj: nuevoArea
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre Area";
           
            return res.status(404).json({
                title: 'Error',
                error: msj + ' existente.'
            });
        }
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}

function editarArea(req, res) {
    Area.findById(req.params.idArea, function (err, area) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!area) {
            return res.status(404).json({
                title: 'Error',
                error: 'Area no encontrado'
            });
        }
        
        area.nombre = req.body.nombre;
        
        area.save().then(function (area) {
            res.status(200).json({
                message: 'Success',
                obj: area
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarArea(req, res){
    Area.findOne({'_id': req.params.idArea})
    .exec(function (err, area) {
        if (area) {
            area.remove().then(function (areaEliminado) {
                return res.status(200).json({
                    message: 'area eliminado correctamente',
                    obj: areaEliminado
                });
            }, function (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err.message
                });
            });
        }
        else {
            return res.status(404).json({
                title: 'Error',
                error: err.message
            });
        }
    });
}

// EXPORT
module.exports = {
    getAreas,
    getArea,
    cargarArea,
    editarArea,
    eliminarArea,
}