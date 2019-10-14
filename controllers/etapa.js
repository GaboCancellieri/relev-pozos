'use strict'

var Etapa = require('../models/etapa');

// FUNCIONES
function getEtapas(req, res){
    Etapa.find({}, function (err, etapas) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!etapas) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: etapas
        });
    });
}

function getEtapa(req, res){
    Etapa.findById({'_id': req.params.idEtapa})
    .populate('medicos')
    .exec(function (err, etapa) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!etapa) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: etapa
        });
    });
}

function cargarEtapa(req, res) {
    if (!req.body.nombreEtapa) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
  
    var nuevoEtapa = new Etapa({
        nombre: req.body.nombreEtapa,  
    })

    nuevoEtapa.save().then(function (nuevoEtapa) {
        res.status(201).json({
            message: 'Etapa creado',
            obj: nuevoEtapa
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            if (err.errmsg.toString().includes("nombre"))
                msj = "Nombre Etapa";
           
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

function editarEtapa(req, res) {
    Etapa.findById(req.params.idEtapa, function (err, etapa) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!etapa) {
            return res.status(404).json({
                title: 'Error',
                error: 'Etapa no encontrado'
            });
        }
        
        etapa.nombre = req.body.nombre;
        
        etapa.save().then(function (etapa) {
            res.status(200).json({
                message: 'Success',
                obj: etapa
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarEtapa(req, res){
    Etapa.findOne({'_id': req.params.idEtapa})
    .exec(function (err, etapa) {
        if (etapa) {
            etapa.remove().then(function (etapaEliminado) {
                return res.status(200).json({
                    message: 'etapa eliminado correctamente',
                    obj: etapaEliminado
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
    getEtapas,
    getEtapa,
    cargarEtapa,
    editarEtapa,
    eliminarEtapa,
}