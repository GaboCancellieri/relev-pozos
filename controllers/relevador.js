'use strict'

var Relevador = require('../models/relevador');

// FUNCIONES
function getRelevadores(req, res){
    Relevador.find({})
    .populate('area')
    .exec((err, relevadores) => {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!relevadores) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: relevadores
        });
    });
}

function cargarRelevador(req, res) {
    if (!req.body.nombre) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
    if (!req.body.apellido) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso apellido'
        });
    }
    if (!req.body.telefono) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso telefono'
        });
    }
    if (!req.body.mail) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso mail'
        });
    }
    
    var nuevoRelevador = new Relevador({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        mail: req.body.mail,
        area: req.body.area
    });

    nuevoRelevador.save().then(function (nuevoRelevador) {
        Relevador.populate(nuevoRelevador,['area'],(error, relevadorExp) => {
            if (error) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'No se pudo expandir'
                });
            }
            res.status(201).json({
                message: 'Relevador creado',
                obj: relevadorExp
            });
        });
    });
}

function editarRelevador(req, res) {
    Relevador.findById(req.params.idRelevador, function (err, relevador) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!relevador) {
            return res.status(404).json({
                title: 'Error',
                error: 'Relevador no encontrado'
            });
        }

        relevador.nombre = req.body.nombre;
        relevador.apellido = req.body.apellido;
        relevador.telefono = req.body.telefono;
        relevador.mail = req.body.mail;
        relevador.area = req.body.area;

        relevador.save().then(function (relevadorEditado) {
            Relevador.populate(relevadorEditado,['area'],(error, relevadorExp) => {
                if (error) {
                    return res.status(400).json({
                        title: 'Error',
                        error: 'No se pudo expandir'
                    });
                }
                res.status(201).json({
                    message: 'Relevador creado',
                    obj: relevadorExp
                });
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarRelevador(req, res){
    Relevador.findOne({'_id': req.params.idRelevador})
    .exec(function (err, relevador) {
        if (relevador) {
            relevador.remove().then(function (relevadorEliminado) {
                return res.status(200).json({
                    message: 'Relevador eliminado correctamente',
                    obj: relevadorEliminado
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
    getRelevadores,
    cargarRelevador,
    editarRelevador,
    eliminarRelevador
}

