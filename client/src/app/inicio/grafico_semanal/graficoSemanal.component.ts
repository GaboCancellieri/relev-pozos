import { Component, OnInit } from '@angular/core';
import { PozoService } from 'src/app/pozos/pozo.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { SemanaUtils } from 'src/app/shared/SemanaUtil';

@Component({
    selector: 'app-grafico-semanal',
    templateUrl: './graficoSemanal.component.html',
})
export class GraficoSemanalComponent implements OnInit {
    data: any;
    options: any;
    backgroundColor = ['#ff1100', '#dbc200', '#1dad00', '#F49917', '#17A2B7', '#23BE08'];
    hoverBackgroundColor = ['#ff1100', '#dbc200', '#1dad00', '#F49917', '#17A2B7', '#23BE08'];

    public pieChartPlugins = [pluginDataLabels];


    constructor(
        private pozoService: PozoService
    ) {
    }

    ngOnInit() {
        this.getConteoSemanal(SemanaUtils.calcularSemana());
        this.options = {
            title: {
                display: true,
                text: 'Grafico Semanal',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
    }

    getConteoSemanal(semana: string) {
        this.pozoService.getConteoSemanal(semana)
            .then(conteoSemanal => {
                console.log(conteoSemanal);
                this.data = {
                    labels: ['PRIMERA ETAPA (' + conteoSemanal.porcentaje[0] + '%)', 'SEGUNDA ETAPA (' + conteoSemanal.porcentaje[1] + '%)',
                    'TERCERA ETAPA (' + conteoSemanal.porcentaje[2] + '%)'],
                    datasets: [
                        {
                            data: conteoSemanal.conteo,
                            backgroundColor: this.backgroundColor,
                            hoverBackgroundColor: this.hoverBackgroundColor
                        }]
                };
            });
    }
}
