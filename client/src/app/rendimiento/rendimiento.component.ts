import { Component, OnInit } from '@angular/core';
import { PozoService } from '../pozos/pozo.service';
import { SelectItem } from 'primeng/api';
import * as Chart from 'chart.js';
import { SemanaUtils } from '../shared/SemanaUtil';

@Component({
    selector: 'app-rendimientos',
    templateUrl: './rendimiento.component.html',
})
export class RendimientoComponent implements OnInit {

    types: SelectItem[];
    selectedType = 'General Semanal';
    data: any = {};
    dataMensual: any = {};
    equipoTera: any;
    cesar: any;
    milton: any;
    paco: any;
    optionsMensual: any;
    constructor(
        private pozoService: PozoService
    ) {
    this.types = [
      { label: 'General Semanal', value: 'General Semanal', icon: 'fas fa-chart-bar' },
      { label: 'Acumulado Mensual', value: 'Acumulado Mensual', icon: 'fas fa-chart-bar' },
      { label: 'Cesar', value: 'Cesar', icon: 'fas fa-user-cog' },
      { label: 'Jose', value: 'Jose', icon: 'fas fa-user-cog' },
      { label: 'Antonio', value: 'Antonio', icon: 'fas fa-user-cog' },
      { label: 'Milton', value: 'Milton', icon: 'fas fa-user-cog' },
      { label: 'Equipo Tera', value: 'EQUIPO', icon: 'fas fa-user-cog' },
    ];
    }

    ngOnInit() {
        // Change default options for ALL charts
        Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
            color: '#000000',
            font: {
                weight: 'bold',
                size: 20,
            }
        });
        const semana = SemanaUtils.calcularSemana();

        this.getRelevPozos('EQUIPO', semana);
        this.getRelevPozos('Cesar', semana);
        this.getRelevPozos('Jose', semana);
        this.getRelevPozos('Milton', semana);

        this.getGeneralMensual();

        this.optionsMensual = {
            title: {
                display: true,
                text: 'Acumulado Mensual General',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
    }

    getRelevPozos(nombre: string, semana: string) {
        this.pozoService.getRelevPozos(nombre, semana)
            .then(rendimiento => {
                if (nombre === 'EQUIPO') {
                    this.equipoTera = rendimiento;
                } else if (nombre === 'Cesar') {
                    this.cesar = rendimiento;
                } else if (nombre === 'Jose') {
                    this.paco = rendimiento;
                } else if (nombre === 'Milton') {
                    this.milton = rendimiento;
                }

                if (this.equipoTera && this.cesar && this.milton && this.paco) {
                    this.data = {
                        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
                        datasets: [
                        {
                            label: 'Milton',
                            backgroundColor: '#b64fff',
                            borderColor: '#000000',
                            data: this.milton
                        },
                        {
                            label: 'Jose',
                            backgroundColor: '#4f98ff',
                            borderColor: '#000000',
                            data: this.paco
                        },
                        {
                            label: 'Cesar',
                            backgroundColor: '#43b549',
                            borderColor: '#000000',
                            data: this.cesar
                        },
                        {
                            label: 'Equipo Tera',
                            backgroundColor: '#ff8800',
                            borderColor: '#000000',
                            data: this.equipoTera
                        },
                        ]
                    };
                }
            });
    }

    getGeneralMensual() {
        this.pozoService.getGeneralMensual()
            .then(conteoSemanal => {
                    console.log(conteoSemanal)
                    this.dataMensual = {
                        labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre'],
                        datasets: [
                            {
                                label: 'Pendientes (Etapa 1)',
                                backgroundColor: '#ff0000',
                                borderColor: '#000000',
                                data: conteoSemanal.acumulado.etapa1.pendientes
                            },
                            {
                                label: 'Realizados (Etapa 1)',
                                backgroundColor: '#ffc7c7',
                                borderColor: '#000000',
                                data: conteoSemanal.acumulado.etapa1.realizados
                            },
                            {
                                label: 'Pendientes (Etapa 2)',
                                backgroundColor: '#ffc800',
                                borderColor: '#000000',
                                data: conteoSemanal.acumulado.etapa2.pendientes
                            },
                            {
                                label: 'Realizados (Etapa 2)',
                                backgroundColor: '#ffe78f',
                                borderColor: '#000000',
                                data: conteoSemanal.acumulado.etapa2.realizados
                            },
                            {
                                label: 'Pendientes (Etapa 3)',
                                backgroundColor: '#18ff00',
                                borderColor: '#000000',
                                data: conteoSemanal.acumulado.etapa3.pendientes
                            },
                            {
                                label: 'Realizados (Etapa 3)',
                                backgroundColor: '#bcffb5',
                                borderColor: '#000000',
                                data: conteoSemanal.acumulado.etapa3.realizados
                            },
                        ]
                    };
            });
    }
}
