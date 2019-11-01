import { Component, OnInit, Input } from '@angular/core';
import { PozoService } from 'src/app/pozos/pozo.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { SemanaUtils } from 'src/app/shared/SemanaUtil';
import { SelectItem } from 'primeng/api';
import { Relevador } from 'src/app/relevadores/relevador';

@Component({
    selector: 'app-por-relevador',
    templateUrl: './porRelevador.component.html',
})
export class PorRelevadorComponent implements OnInit {
    @Input() selectedRelevador: string;

    data: any;
    dataMensual: any;
    options: any;
    optionsMensual: any;

    public pieChartPlugins = [pluginDataLabels];


    constructor(
        private pozoService: PozoService
    ) {
    }

    ngOnInit() {
        // this.getConteoSemanal(SemanaUtils.calcularSemana());
        console.log(this.selectedRelevador);
        this.getRendimientoRelevador(this.selectedRelevador);

        this.options = {
            title: {
                display: true,
                text: 'Acumulado Mensual',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };

        this.optionsMensual = {
            title: {
                display: true,
                text: 'Rendimiento Mensual',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
    }

    getRendimientoRelevador(relevador: string) {
        this.pozoService.getRelevMesPozos(relevador)
            .then(conteoSemanal => {
                console.log(conteoSemanal)
                this.data = {
                    labels: ['Agosto', 'Septiembre', 'Octubre'],
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

                this.dataMensual = {
                    labels: ['Agosto', 'Septiembre', 'Octubre'],
                    datasets: [
                    {
                        label: 'Realizados (Etapa 1)',
                        backgroundColor: '#ffc7c7',
                        borderColor: '#000000',
                        data: conteoSemanal.mensual.etapa1
                    },
                    {
                        label: 'Realizados (Etapa 2)',
                        backgroundColor: '#ffe78f',
                        borderColor: '#000000',
                        data: conteoSemanal.mensual.etapa2
                    },
                    {
                        label: 'Realizados (Etapa 3)',
                        backgroundColor: '#bcffb5',
                        borderColor: '#000000',
                        data: conteoSemanal.mensual.etapa3
                    },
                    ]
                };
            });
    }
}
