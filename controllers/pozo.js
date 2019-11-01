'use strict'

var Pozo = require('../models/pozo');
var EstadoPozo = require('../models/estadoPozo');
var Etapa = require('../models/etapa');
var Relevador = require('../models/relevador');

// FUNCIONES
function getPozos(req, res) {
    Pozo.find({})
        .populate('estado.estadoPozo')
        .populate('relevador')
        .populate('etapa')
        //.populate('areaConcesion')
        //.populate('areaReserva')
        .populate('provincia')
        //.populate('region')
        .populate('zona')
        //.populate('activo')
        //.populate('operacion')
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

/*function convertirFechas() {
    Pozo.findById("5da52cd7b0111065b34c6e71")
        .exec((error, pozo) => {
            console.log(Date.now());
            var parts = pozo.estado.fecha.toISOString().substring(0, 10).split('-');
            console.log(parts)
            var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
            console.log(mydate.toISOString())
            pozo.estado.fecha = mydate;
            pozo.save();
        });
}*/


function convertirFecha(st) {
    var parts = st.split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    return mydate;
}

function cargarRelevos() {
    Pozo.find({
            'nombre': {
                $in: nombres
            }
        })
        .exec((err, pozos) => {
            for (const pozo of pozos) {
                for (const nf of nombreFecha) {
                    if (pozo.nombre === nf.nombre) {
                        pozo.fechaRelevo = convertirFecha(nf.fechaRelevo);
                        // pozo.save();
                    }
                }
            }
        });
}

function cargarSubidos() {
    Pozo.find({})
        .exec((err, pozos) => {
           
        });
}

function getConteoEtapa(req, res) {
    // convertirFechas();
    // cargarRelevos();    
    // cargarSubidos();
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
                    reserva: 0,
                    listos: 0,
                    subidos: 0
                },
                segundaEtapa: {
                    pendientes: 0,
                    relevados: 0,
                    correccion: 0,
                    revision: 0,
                    reserva: 0,
                    listos: 0,
                    subidos: 0
                },
                terceraEtapa: {
                    pendientes: 0,
                    relevados: 0,
                    correccion: 0,
                    revision: 0,
                    reserva: 0,
                    listos: 0,
                    subidos: 0
                },
                sinAsignar: 0
            };

            let pendientes = 0;
            let relevados = 0;
            let correccion = 0;
            let revision = 0;
            let reserva = 0;
            let listos = 0;
            let subidos = 0;

            for (const pozo of pozos) {
                if (pozo.etapa.nombre === "Sin Asignar") {
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
                    } else if (pozo.estado.estadoPozo.nombre === 'Reserva') {
                        conteoEtapa.primeraEtapa.reserva++;
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
                    } else if (pozo.estado.estadoPozo.nombre === 'Reserva') {
                        conteoEtapa.segundaEtapa.reserva++;
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
                    } else if (pozo.estado.estadoPozo.nombre === 'Reserva') {
                        conteoEtapa.terceraEtapa.reserva++;
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

            let fechaMin;
            let fechaMax;
            if (req.params.semana === '1') {
                fechaMin = new Date(2019, 7, 22);
                fechaMax = new Date(2019, 7, 30);
            } else if (req.params.semana === '2') {
                fechaMin = new Date(2019, 8, 2);
                fechaMax = new Date(2019, 8, 8);
            } else if (req.params.semana === '3') {
                fechaMin = new Date(2019, 8, 9);
                fechaMax = new Date(2019, 8, 15);
            } else if (req.params.semana === '4') {
                fechaMin = new Date(2019, 8, 16);
                fechaMax = new Date(2019, 8, 22);
            } else if (req.params.semana === '5') {
                fechaMin = new Date(2019, 8, 23);
                fechaMax = new Date(2019, 8, 29);
            } else if (req.params.semana === '6') {
                fechaMin = new Date(2019, 8, 30);
                fechaMax = new Date(2019, 9, 6);
            } else if (req.params.semana === '7') {
                fechaMin = new Date(2019, 9, 7);
                fechaMax = new Date(2019, 9, 13);
            } else if (req.params.semana === '8') {
                fechaMin = new Date(2019, 9, 14);
                fechaMax = new Date(2019, 9, 20);
            } else if (req.params.semana === '9') {
                fechaMin = new Date(2019, 9, 21);
                fechaMax = new Date(2019, 9, 27);
            } else if (req.params.semana === '10') {
                fechaMin = new Date(2019, 9, 28);
                fechaMax = new Date(2019, 10, 3);
            } else if (req.params.semana === '11') {
                fechaMin = new Date(2019, 10, 4);
                fechaMax = new Date(2019, 10, 10);
            } else if (req.params.semana === '12') {
                fechaMin = new Date(2019, 10, 11);
                fechaMax = new Date(2019, 10, 17);
            } else if (req.params.semana === '13') {
                fechaMin = new Date(2019, 10, 18);
                fechaMax = new Date(2019, 10, 24);
            } else if (req.params.semana === '14') {
                fechaMin = new Date(2019, 10, 25);
                fechaMax = new Date(2019, 11, 1);
            }

            Pozo.find({
                    $and: [{
                            'estado.fecha': {
                                "$gte": fechaMin,
                                "$lte": fechaMax
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

                    const total = primera + segunda + tercera;
                    const porcentPrimera = ((primera / total) * 100).toFixed(2);
                    const porcentSegunda = ((segunda / total) * 100).toFixed(2);
                    const porcentTercera = ((tercera / total) * 100).toFixed(2);

                    var conteoSemanal = {
                        porcentaje: [porcentPrimera, porcentSegunda, porcentTercera],
                        conteo: [primera, segunda, tercera]
                    }
                    res.status(200).json({
                        message: 'Success',
                        obj: conteoSemanal
                    });
                });
        });
}

function getConteoAcumulado(req, res) {
    EstadoPozo.findOne({
            nombre: 'Subido'
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
                    'estado.estadoPozo': estadoPozo._id
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

                    var total = primera + segunda + tercera;
                    var porcPrimera = ((primera / total) * 100).toFixed(2);
                    var porcSegunda = ((segunda / total) * 100).toFixed(2);
                    var porcTercera = ((tercera / total) * 100).toFixed(2);

                    var conteoAcumulado = {
                        porcentaje: [porcPrimera, porcSegunda, porcTercera],
                        conteo: [primera, segunda, tercera]
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: conteoAcumulado
                    });
                });
        });
}

function getConteoAcumuladoPorEtapa(req, res) {
    Etapa.findOne({
            'nombre': req.params.etapa
        })
        .exec((error, etapa) => {
            if (error) {
                return res.status(400).json({
                    title: 'Error',
                    error: error
                });
            }

            if (!etapa) {
                return res.status(400).json({
                    title: 'Error',
                    error: 'No se encuentra la etapa'
                });
            }

            Pozo.find({
                    'etapa': etapa._id
                })
                .populate('estado.estadoPozo')
                .exec(function (err, pozos) {
                    if (err) {
                        return res.status(400).json({
                            title: 'Error',
                            error: err
                        });
                    }

                    let subido = 0;
                    let pendiente = 0;

                    for (const pozo of pozos) {
                        if (pozo.estado.estadoPozo.nombre === 'Pendiente') {
                            pendiente++;
                        } else if (pozo.estado.estadoPozo.nombre === 'Subido') {
                            subido++;
                        }
                    }

                    const total = subido + pendiente;
                    const porcentSubido = ((subido / total) * 100).toFixed(2);
                    const porcentPendiente = ((pendiente / total) * 100).toFixed(2);

                    var conteoAcumuladoPorEtapa = {
                        porcentaje: [porcentSubido, porcentPendiente],
                        conteo: [subido, pendiente]
                    }

                    res.status(200).json({
                        message: 'Success',
                        obj: conteoAcumuladoPorEtapa
                    });
                });
        });
}

function getPozosRelevadorSemanal(req, res) {
    Relevador.findOne({
            'nombre': req.params.nomRelev
        })
        .exec((error, relevador) => {
            let fechaMin;
            let fechaMax;
            if (req.params.semana === '1') {
                fechaMin = new Date(2019, 7, 22);
                fechaMax = new Date(2019, 7, 30);
            } else if (req.params.semana === '2') {
                fechaMin = new Date(2019, 8, 2);
                fechaMax = new Date(2019, 8, 8);
            } else if (req.params.semana === '3') {
                fechaMin = new Date(2019, 8, 9);
                fechaMax = new Date(2019, 8, 15);
            } else if (req.params.semana === '4') {
                fechaMin = new Date(2019, 8, 16);
                fechaMax = new Date(2019, 8, 22);
            } else if (req.params.semana === '5') {
                fechaMin = new Date(2019, 8, 23);
                fechaMax = new Date(2019, 8, 29);
            } else if (req.params.semana === '6') {
                fechaMin = new Date(2019, 8, 30);
                fechaMax = new Date(2019, 9, 6);
            } else if (req.params.semana === '7') {
                fechaMin = new Date(2019, 9, 7);
                fechaMax = new Date(2019, 9, 13);
            } else if (req.params.semana === '8') {
                fechaMin = new Date(2019, 9, 14);
                fechaMax = new Date(2019, 9, 20);
            } else if (req.params.semana === '9') {
                fechaMin = new Date(2019, 9, 21);
                fechaMax = new Date(2019, 9, 27);
            } else if (req.params.semana === '10') {
                fechaMin = new Date(2019, 9, 28);
                fechaMax = new Date(2019, 10, 3);
            } else if (req.params.semana === '11') {
                fechaMin = new Date(2019, 10, 4);
                fechaMax = new Date(2019, 10, 10);
            } else if (req.params.semana === '12') {
                fechaMin = new Date(2019, 10, 11);
                fechaMax = new Date(2019, 10, 17);
            } else if (req.params.semana === '13') {
                fechaMin = new Date(2019, 10, 18);
                fechaMax = new Date(2019, 10, 24);
            } else if (req.params.semana === '14') {
                fechaMin = new Date(2019, 10, 25);
                fechaMax = new Date(2019, 11, 1);
            }

            Pozo.aggregate([{
                        $match: {
                            "$and": [{
                                    relevador: relevador._id
                                },
                                {
                                    fechaRelevo: {
                                        "$gte": fechaMin,
                                        "$lte": fechaMax,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $group: {
                            _id: "$fechaRelevo",
                            count: {
                                $sum: 1
                            }
                        }
                    }
                ])
                .then(result => {
                    var resultado = [0, 0, 0, 0, 0, 0, 0]

                    for (const grupo of result) {
                        if (grupo._id.getDay() === 1) {
                            resultado[0] = grupo.count;
                        } else if (grupo._id.getDay() === 2) {
                            resultado[1] = grupo.count;
                        } else if (grupo._id.getDay() === 3) {
                            resultado[2] = grupo.count;
                        } else if (grupo._id.getDay() === 4) {
                            resultado[3] = grupo.count;
                        } else if (grupo._id.getDay() === 5) {
                            resultado[4] = grupo.count;
                        } else if (grupo._id.getDay() === 6) {
                            resultado[5] = grupo.count;
                        } else if (grupo._id.getDay() === 7) {
                            resultado[6] = grupo.count;
                        }
                    }

                    res.status(200).json({
                        message: 'Exito',
                        obj: resultado
                    });
                })
        })

}


function getMes(fecha) {
    var mes
    if (fecha >= new Date(2019, 7, 22) && fecha <= new Date(2019, 7, 30)) {
        mes = 0;
    } else if (fecha >= new Date(2019, 8, 2) && fecha <= new Date(2019, 8, 27)) {
        mes = 1;
    } else if (fecha >= new Date(2019, 8, 30) && fecha <= new Date(2019, 9, 27)) {
        mes = 2;
    } else if (fecha >= new Date(2019, 9, 28) && fecha <= new Date(2019, 10, 24)) {
        mes = 3;
    } else if (fecha >= new Date(2019, 10, 25) && fecha <= new Date(2019, 11, 1)) {
        mes = 4;
    }

    return mes;
}

function getConteoPorMesRelevador(req, res) {
    Relevador.findOne({
            'nombre': req.params.nomRelev
        })
        .exec((error, relevador) => {
            if (error) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            if (!relevador) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: 'No existe relevador'
                });
            }

            Pozo.find({
                    $and: [{
                        'relevador': relevador._id
                    }, {
                        'etapa': {
                            $exists: true
                        }
                    }]
                })
                .populate('estado.estadoPozo')
                .populate('etapa')
                .exec((err, pozos) => {
                    if (err) {
                        return res.status(400).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }

                    var conteo = {
                        acumulado: {
                            etapa1: {
                                realizados: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            },
                            etapa2: {
                                realizados: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            },
                            etapa3: {
                                realizados: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            }
                        },
                        mensual: {
                            etapa1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            etapa2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            etapa3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        }
                    }
                    var total1 = 0;
                    var total2 = 0;
                    var total3 = 0;
                    var mes = 0;
                    for (const pozo of pozos) {
                        if (pozo.etapa.nombre === 'Etapa 1') {
                            if (pozo.estado.estadoPozo.nombre === 'Subido' || pozo.estado.estadoPozo.nombre === 'Listo') {
                                mes = getMes(pozo.fechaRelevo)
                                conteo.mensual.etapa1[mes] = conteo.mensual.etapa1[mes] + 1;
                            }
                            total1++;
                        } else if (pozo.etapa.nombre === 'Etapa 2') {
                            if (pozo.estado.estadoPozo.nombre === 'Subido' || pozo.estado.estadoPozo.nombre === 'Listo') {
                                mes = getMes(pozo.fechaRelevo)
                                conteo.mensual.etapa2[mes] = conteo.mensual.etapa2[mes] + 1;
                            }
                            total2++;
                        }
                        if (pozo.etapa.nombre === 'Etapa 3') {
                            if (pozo.estado.estadoPozo.nombre === 'Subido' || pozo.estado.estadoPozo.nombre === 'Listo') {
                                mes = getMes(pozo.fechaRelevo)
                                conteo.mensual.etapa3[mes] = conteo.mensual.etapa3[mes] + 1;
                            }
                            total3++;
                        }

                    }

                    var acumulado1 = 0;
                    var acumulado2 = 0;
                    var acumulado3 = 0;
                    var mesHoy = getMes(new Date())
                    let i = 0;

                    if (req.params.nomRelev !== 'EQUIPO') {
                        if (req.params.nomRelev === 'Milton') {
                            i = 2;
                        }

                        if (req.params.nomRelev === 'Antonio') {
                            mesHoy = 2;
                        }

                        for (i; i < mesHoy; i++) {
                            if (conteo.mensual.etapa1[i] != 0) {
                                acumulado1 = acumulado1 + conteo.mensual.etapa1[i];
                                conteo.acumulado.etapa1.realizados[i] = acumulado1;
                                conteo.acumulado.etapa1.pendientes[i] = total1 - acumulado1;
                            } else {
                                conteo.acumulado.etapa1.pendientes[i] = total1;
                            }
                            if (conteo.mensual.etapa2[i] != 0) {
                                acumulado2 = acumulado2 + conteo.mensual.etapa2[i];
                                conteo.acumulado.etapa2.realizados[i] = acumulado2;
                                conteo.acumulado.etapa2.pendientes[i] = total2 - acumulado2;
                            } else {
                                conteo.acumulado.etapa2.pendientes[i] = total2;
                            }
                            if (conteo.mensual.etapa3[i] != 0) {
                                acumulado3 = acumulado3 + conteo.mensual.etapa3[i];
                                conteo.acumulado.etapa3.realizados[i] = acumulado3;
                                conteo.acumulado.etapa3.pendientes[i] = total3 - acumulado3;
                            } else {
                                conteo.acumulado.etapa3.pendientes[i] = total3;
                            }
                        }
                    } else {
                        for (i; i < mesHoy; i++) {
                            if (conteo.mensual.etapa1[i] != 0) {
                                acumulado1 = acumulado1 + conteo.mensual.etapa1[i];
                                conteo.acumulado.etapa1.realizados[i] = acumulado1;
                            }
                            if (conteo.mensual.etapa2[i] != 0) {
                                acumulado2 = acumulado2 + conteo.mensual.etapa2[i];
                                conteo.acumulado.etapa2.realizados[i] = acumulado2;
                            }
                            if (conteo.mensual.etapa3[i] != 0) {
                                acumulado3 = acumulado3 + conteo.mensual.etapa3[i];
                                conteo.acumulado.etapa3.realizados[i] = acumulado3;
                            }
                        }
                    }

                    res.status(201).json({
                        message: 'Pozo creado',
                        obj: conteo
                    });
                });
        });
}

function getConteoPorMesGeneral(req, res) {
    Pozo.find({
            'etapa': {
                $ne: "5db2966cc4b475111ae0440a"
            }
        })
        .populate('estado.estadoPozo')
        .populate('etapa')
        .exec((err, pozos) => {
            if (err) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            var conteo = {
                acumulado: {
                    etapa1: {
                        realizados: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    etapa2: {
                        realizados: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    etapa3: {
                        realizados: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    }
                },
                mensual: {
                    etapa1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    etapa2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    etapa3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                }
            }
            var total1 = 0;
            var total2 = 0;
            var total3 = 0;
            var mes = 0;
            for (const pozo of pozos) {
                if (pozo.etapa.nombre === 'Etapa 1') {
                    if (pozo.estado.estadoPozo.nombre === 'Subido' || pozo.estado.estadoPozo.nombre === 'Listo') {
                        mes = getMes(pozo.fechaRelevo)
                        conteo.mensual.etapa1[mes] = conteo.mensual.etapa1[mes] + 1;
                    }
                    total1++;
                } else if (pozo.etapa.nombre === 'Etapa 2') {
                    if (pozo.estado.estadoPozo.nombre === 'Subido' || pozo.estado.estadoPozo.nombre === 'Listo') {
                        mes = getMes(pozo.fechaRelevo)
                        conteo.mensual.etapa2[mes] = conteo.mensual.etapa2[mes] + 1;
                    }
                    total2++;
                }
                if (pozo.etapa.nombre === 'Etapa 3') {
                    if (pozo.estado.estadoPozo.nombre === 'Subido' || pozo.estado.estadoPozo.nombre === 'Listo') {
                        mes = getMes(pozo.fechaRelevo)
                        conteo.mensual.etapa3[mes] = conteo.mensual.etapa3[mes] + 1;
                    }
                    total3++;
                }

            }

            var acumulado1 = 0;
            var acumulado2 = 0;
            var acumulado3 = 0;
            var mesHoy = getMes(new Date())
            for (let i = 0; i < mesHoy; i++) {
                if (conteo.mensual.etapa1[i] != 0) {
                    acumulado1 = acumulado1 + conteo.mensual.etapa1[i];
                    conteo.acumulado.etapa1.realizados[i] = acumulado1;
                    conteo.acumulado.etapa1.pendientes[i] = total1 - acumulado1;
                } else {
                    conteo.acumulado.etapa1.pendientes[i] = total1;
                }
                if (conteo.mensual.etapa2[i] != 0) {
                    acumulado2 = acumulado2 + conteo.mensual.etapa2[i];
                    conteo.acumulado.etapa2.realizados[i] = acumulado2;
                    conteo.acumulado.etapa2.pendientes[i] = total2 - acumulado2;
                } else {
                    conteo.acumulado.etapa2.pendientes[i] = total2;
                }
                if (conteo.mensual.etapa3[i] != 0) {
                    acumulado3 = acumulado3 + conteo.mensual.etapa3[i];
                    conteo.acumulado.etapa3.realizados[i] = acumulado3;
                    conteo.acumulado.etapa3.pendientes[i] = total3 - acumulado3;
                } else {
                    conteo.acumulado.etapa3.pendientes[i] = total3;
                }
            }

            res.status(201).json({
                message: 'Pozo creado',
                obj: conteo
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
    EstadoPozo.findOne({
            'nombre': req.body.estado
        })
        .exec((error, estado) => {
            if (error) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }

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

                if (req.body.nombre) {
                    pozo.nombre = req.body.nombre
                }

                if (req.body.coordenadas) {
                    pozo.coordenadas = req.body.coordenadas
                }

                if (!pozo.fechaRelevo) {
                    pozo.fechaRelevo = new Date(2019, 9, 31);
                }

                if (estado) {
                    pozo.estado.estadoPozo = estado;
                }

                if (req.body.fecha) {
                    pozo.estado.fecha = new Date(2019, 9, 31);
                }

                if (req.body.idRelevador) {
                    pozo.relevador = req.body.idRelevador
                }

                if (req.body.idEtapa) {
                    pozo.etapa = req.body.idEtapa
                }

                pozo.save().then(function (pozoGuardado) {
                    Pozo.populate(pozoGuardado, ['relevador', 'etapa', 'estado.estadoPozo'], (error, pozoExp) => {
                        res.status(200).json({
                            message: 'Success',
                            obj: pozoExp
                        });
                    });
                }, function (err) {
                    return res.status(404).json({
                        title: 'Error',
                        error: err
                    });
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
    getConteoAcumuladoPorEtapa,
    getPozosRelevadorSemanal,
    getConteoPorMesRelevador,
    getConteoPorMesGeneral,
    cargarPozo,
    editarPozo,
    eliminarPozo,
}