'use strict'

var Pozo = require('../models/pozo');
var EstadoPozo = require('../models/estadoPozo');
var Etapa = require('../models/etapa');

// FUNCIONES
function getPozos(req, res) {
    Pozo.find({})
        .populate('estado.estadoPozo')
        .populate('relevador')
        .populate('etapa')
        .populate('areaConcesion')
        .populate('areaReserva')
        .populate('provincia')
        .populate('region')
        .populate('activo')
        .populate('operacion')
        .populate('yacimiento')
        .exec((err, pozos) => {
            if (err) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            if (!pozos) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: pozos
            });
        });
}

function getPozo(req, res) {
    Pozo.findById({
            '_id': req.params.idPozo
        })
        .exec(function (err, pozo) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }
            if (!pozo) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: pozo
            });
        });
}

function getConteoEtapa(req, res) {
    Pozo.find({})
        .populate('estado.estadoPozo')
        .populate('etapa')
        .exec(function (err, pozos) {
            if (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err
                });
            }

            var conteoEtapa = {
                    primeraEtapa: {
                        pendientes: 0,
                        relevados: 0,
                        correccion: 0,
                        revision: 0,
                        listos: 0,
                        subidos: 0
                    },
                    segundaEtapa: {
                        pendientes: 0,
                        relevados: 0,
                        correccion: 0,
                        revision: 0,
                        listos: 0,
                        subidos: 0
                    },
                    terceraEtapa: {
                        pendientes: 0,
                        relevados: 0,
                        correccion: 0,
                        revision: 0,
                        listos: 0,
                        subidos: 0
                    },
                    sinAsignar: 0
            };

            let pendientes = 0;
            let relevados = 0;
            let correccion = 0;
            let revision = 0;
            let listos = 0;
            let subidos = 0;

            for (const pozo of pozos) {
                if (!pozo.etapa) {
                    conteoEtapa.sinAsignar++;
                } else if (pozo.etapa.nombre === "Etapa 1") {
                    if (pozo.estado.estadoPozo.nombre === 'Pendiente') {
                        conteoEtapa.primeraEtapa.pendientes++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Relevado') {
                        conteoEtapa.primeraEtapa.relevados++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Correccion') {
                        conteoEtapa.primeraEtapa.correccion++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Revision') {
                        conteoEtapa.primeraEtapa.revision++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Listo') {
                        conteoEtapa.primeraEtapa.listos++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Subido') {
                        conteoEtapa.primeraEtapa.subidos++;
                    }
                } else if (pozo.etapa.nombre === "Etapa 2") {
                    if (pozo.estado.estadoPozo.nombre === 'Pendiente') {
                        conteoEtapa.segundaEtapa.pendientes++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Relevado') {
                        conteoEtapa.segundaEtapa.relevados++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Correccion') {
                        conteoEtapa.segundaEtapa.correccion++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Revision') {
                        conteoEtapa.segundaEtapa.revision++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Listo') {
                        conteoEtapa.segundaEtapa.listos++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Subido') {
                        conteoEtapa.segundaEtapa.subidos++;
                    }
                } else if (pozo.etapa.nombre === "Etapa 3") {
                    if (pozo.estado.estadoPozo.nombre === 'Pendiente') {
                        conteoEtapa.terceraEtapa.pendientes++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Relevado') {
                        conteoEtapa.terceraEtapa.relevados++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Correccion') {
                        conteoEtapa.terceraEtapa.correccion++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Revision') {
                        conteoEtapa.terceraEtapa.revision++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Listo') {
                        conteoEtapa.terceraEtapa.listos++;
                    } else if (pozo.estado.estadoPozo.nombre === 'Subido') {
                        conteoEtapa.terceraEtapa.subidos++;
                    }
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: conteoEtapa
            });
        });
}

function getConteoSemanal(req, res) {
    EstadoPozo.findOne({
            'nombre': 'Subido'
        })
        .exec((error, estadoPozo) => {
            if (error) {
                return res.status(400).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!estadoPozo) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'No se encuentra estado pozo'
                });
            }

            var fechaMin = new Date();
            fechaMin.setDate(fechaMin.getDate() - (fechaMin.getDay() + 6) % 7);
            fechaMin.setSeconds(0);
            fechaMin.setMinutes(0);
            fechaMin.setHours(0);
            Pozo.find({
                    $and: [{
                            'estado.fecha': {
                                $gte: fechaMin
                            }
                        },
                        {
                            'estado.estadoPozo': estadoPozo.id
                        }
                    ]
                })
                .populate('etapa')
                .exec(function (err, pozos) {
                    if (err) {
                        return res.status(400).json({
                            title: 'Error',
                            error: err
                        });
                    }

                    let primera = 0;
                    let segunda = 0;
                    let tercera = 0;

                    for (const pozo of pozos) {
                        if (pozo.etapa.nombre === 'Etapa 1') {
                            primera++;
                        } else if (pozo.etapa.nombre === 'Etapa 2') {
                            segunda++;
                        } else if (pozo.etapa.nombre === 'Etapa 3') {
                            tercera++;
                        }
                    }

                    var conteoSemanal = [primera, segunda, tercera]

                    res.status(200).json({
                        message: 'Success',
                        obj: conteoSemanal
                    });
                });
        });
}

function getConteoAcumulado(req, res) {
    EstadoPozo.findOne({
            'nombre': 'Subido'
        })
        .exec((error, estadoPozo) => {
            if (error) {
                return res.status(400).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!estadoPozo) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'No se encuentra estado pozo'
                });
            }
            Pozo.find({
                    'estado.estadoPozo': estadoPozo.id
                })
                .populate('etapa')
                .exec(function (err, pozos) {
                    if (err) {
                        return res.status(400).json({
                            title: 'Error',
                            error: err
                        });
                    }

                    let primera = 0;
                    let segunda = 0;
                    let tercera = 0;

                    for (const pozo of pozos) {
                        if (pozo.etapa.nombre === 'Etapa 1') {
                            primera++;
                        } else if (pozo.etapa.nombre === 'Etapa 2') {
                            segunda++;
                        } else if (pozo.etapa.nombre === 'Etapa 3') {
                            tercera++;
                        }
                    }

                    var conteoSemanal = [primera, segunda, tercera]

                    res.status(200).json({
                        message: 'Success',
                        obj: conteoSemanal
                    });
                });
        });
}

function cargarPozo(req, res) {
    if (!req.body.nombre) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso nombre'
        });
    }
    if (!req.body.estado) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso estado'
        });
    } else {
        if (req.body.estado !== 'Pendiente') {
            if (!req.body.fecha) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'No ingreso fecha'
                });
            }
            if (!req.body.idRelevador) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'No ingreso relevador'
                });
            }
        }
    }
    if (!req.body.idArea) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso area'
        });
    }
    if (!req.body.idEtapa) {
        return res.status(400).json({
            title: 'Error',
            error: 'No ingreso etapa'
        });
    }

    EstadoPozo.findOne({
            'nombre': req.body.estado
        })
        .exec((error, estadoPozo) => {
            if (error) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!estadoPozo) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Estado de pozo no encontrado'
                });
            }

            var nuevoEstado = {
                estadoPozo: estadoPozo._id,
                fecha: req.body.fecha
            }

            var nuevoPozo = new Pozo({
                nombre: req.body.nombre,
                coordenadas: req.body.coordenadas,
                estado: nuevoEstado,
                relevador: req.body.idRelevador,
                area: req.body.idArea,
                etapa: req.body.idEtapa,
            })

            nuevoPozo.save().then(function (nuevoPozo) {
                Pozo.populate(nuevoPozo, ['estado.estadoPozo', 'area', 'relevador', 'etapa'], (error, pozoExp) => {
                    if (error) {
                        return res.status(400).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }

                    res.status(201).json({
                        message: 'Pozo creado',
                        obj: pozoExp
                    });

                })

            }, function (err) {
                if (err.code == 11000) {
                    var msj = ""
                    //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
                    if (err.errmsg.toString().includes("nombre"))
                        msj = "Nombre de pozo";

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
        });
}

function editarPozo(req, res) {
    Pozo.findById(req.params.idPozo, function (err, pozo) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!pozo) {
            return res.status(404).json({
                title: 'Error',
                error: 'Pozo no encontrado'
            });
        }

        pozo.cuit = req.body.cuitPozo;
        pozo.nombre = req.body.nombrePozo;
        pozo.email = req.body.emailPozo;
        pozo.telefono = req.body.telefonoPozo;
        pozo.direccion = req.body.direccionPozo


        pozo.save().then(function (pozo) {
            res.status(200).json({
                message: 'Success',
                obj: pozo
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarPozo(req, res) {
    Pozo.findOne({
            '_id': req.params.idPozo
        })
        .exec(function (err, pozo) {
            if (pozo) {
                pozo.remove().then(function (pozoEliminado) {
                    return res.status(200).json({
                        message: 'pozo eliminado correctamente',
                        obj: pozoEliminado
                    });
                }, function (err) {
                    return res.status(400).json({
                        title: 'Error',
                        error: err.message
                    });
                });
            } else {
                return res.status(404).json({
                    title: 'Error',
                    error: err.message
                });
            }
        });
}

// EXPORT
module.exports = {
    getPozos,
    getPozo,
    getConteoEtapa,
    getConteoSemanal,
    getConteoAcumulado,
    cargarPozo,
    editarPozo,
    eliminarPozo,
}