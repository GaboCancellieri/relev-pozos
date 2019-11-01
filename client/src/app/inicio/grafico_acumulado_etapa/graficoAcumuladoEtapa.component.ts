import { Component, OnInit } from '@angular/core';
import { PozoService } from 'src/app/pozos/pozo.service';

@Component({
    selector: 'app-grafico-acumulado-etapa',
    templateUrl: './graficoAcumuladoEtapa.component.html',
})
export class GraficoAcumuladoEtapaComponent implements OnInit {
    dataEtapa1: any;
    dataEtapa2: any;
    dataEtapa3: any;

    options1: any;
    options2: any;
    options3: any;
    constructor(
        private pozoService: PozoService
    ) {
    }

    ngOnInit() {
        this.getConteoAcumuladoPorEtapa('Etapa 1');
        this.getConteoAcumuladoPorEtapa('Etapa 2');
        this.getConteoAcumuladoPorEtapa('Etapa 3');
        this.options1 = {
            title: {
                display: true,
                text: 'Primera Etapa',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
        this.options2 = {
            title: {
                display: true,
                text: 'Segunda Etapa',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
        this.options3 = {
            title: {
                display: true,
                text: 'Tercera Etapa',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
    }

    getConteoAcumuladoPorEtapa(etapa: string) {
        this.pozoService.getConteoAcumuladoPorEtapa(etapa)
            .then(conteoAcumulado => {
                if (etapa === 'Etapa 1') {
                    this.dataEtapa1 = {
                        labels: ['RELEVADOS (' + conteoAcumulado.porcentaje[0] + '%)'
                        , 'PENDIENTES (' + conteoAcumulado.porcentaje[1] + '%)'],
                        datasets: [
                            {
                                data: conteoAcumulado.conteo,
                                backgroundColor: ['#ff1100', '#e8e8e8'],
                                hoverBackgroundColor: ['#ff1100', '#e8e8e8']
                            }]
                    };
                } else if (etapa === 'Etapa 2') {
                    this.dataEtapa2 = {
                        labels: ['RELEVADOS (' + conteoAcumulado.porcentaje[0] + '%)'
                        , 'PENDIENTES (' + conteoAcumulado.porcentaje[1] + '%)'],
                        datasets: [
                            {
                                data: conteoAcumulado.conteo,
                                backgroundColor: ['#dbc200', '#e8e8e8'],
                                hoverBackgroundColor: ['#dbc200', '#e8e8e8']
                            }]
                    };
                } else if (etapa === 'Etapa 3') {
                    this.dataEtapa3 = {
                        labels: ['RELEVADOS (' + conteoAcumulado.porcentaje[0] + '%)'
                        , 'PENDIENTES (' + conteoAcumulado.porcentaje[1] + '%)'],
                        datasets: [
                            {
                                data: conteoAcumulado.conteo,
                                backgroundColor: ['#1dad00', '#e8e8e8'],
                                hoverBackgroundColor: ['#1dad00', '#e8e8e8']
                            }]
                    };
                }
            });
    }
}
