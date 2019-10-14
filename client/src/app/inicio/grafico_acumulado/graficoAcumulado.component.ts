import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PozoService } from 'src/app/pozos/pozo.service';

@Component({
    selector: 'app-grafico-acumulado',
    templateUrl: './graficoAcumulado.component.html',
})
export class GraficoAcumuladoComponent implements OnInit {
    data: any;
    labels = ['PRIMERA ETAPA', 'SEGUNDA ETAPA', 'TERCERA ETAPA'];
    backgroundColor = ['#ff1100', '#dbc200', '#1dad00', '#F49917', '#17A2B7', '#23BE08'];
    hoverBackgroundColor = ['#ff1100', '#dbc200', '#1dad00', '#F49917', '#17A2B7', '#23BE08'];

    constructor(
        private pozoService: PozoService
    ) {
    }

    ngOnInit() {
        this.getConteoAcumulado();
    }

    getConteoAcumulado() {
        this.pozoService.getConteoAcumulado()
        .then(conteoAcumulado => {
            console.log(conteoAcumulado);
            this.data = {
                labels: this.labels,
                datasets: [
                    {
                        data: conteoAcumulado,
                        backgroundColor: this.backgroundColor,
                        hoverBackgroundColor: this.hoverBackgroundColor
                    }]
            };
          });
    }
}
