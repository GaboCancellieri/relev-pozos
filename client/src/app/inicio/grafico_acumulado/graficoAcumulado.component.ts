import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PozoService } from 'src/app/pozos/pozo.service';

@Component({
    selector: 'app-grafico-acumulado',
    templateUrl: './graficoAcumulado.component.html',
})
export class GraficoAcumuladoComponent implements OnInit {
    data: any;
    options: any;
    backgroundColor = ['#ff1100', '#dbc200', '#1dad00'];
    hoverBackgroundColor = ['#ff1100', '#dbc200', '#1dad00'];

    constructor(
        private pozoService: PozoService
    ) {
    }

    ngOnInit() {
        this.getConteoAcumulado();
        this.options = {
            title: {
                display: true,
                text: 'Grafico Acumulado',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };
    }

    getConteoAcumulado() {
        this.pozoService.getConteoAcumulado()
        .then(conteoAcumulado => {
            console.log(conteoAcumulado);
            this.data = {
                labels: ['PRIMERA ETAPA (' + conteoAcumulado.porcentaje[0] + '%)', 'SEGUNDA ETAPA (' + conteoAcumulado.porcentaje[1] + '%)',
                'TERCERA ETAPA (' + conteoAcumulado.porcentaje[2] + '%)'],
                datasets: [
                    {
                        data: conteoAcumulado.conteo,
                        backgroundColor: this.backgroundColor,
                        hoverBackgroundColor: this.hoverBackgroundColor
                    }]
            };
          });
    }
}
