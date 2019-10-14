import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PozoService } from 'src/app/pozos/pozo.service';

@Component({
    selector: 'app-grafico-semanal',
    templateUrl: './graficoSemanal.component.html',
})
export class GraficoSemanalComponent implements OnInit {
    data: any;
    labels = ['PRIMERA ETAPA', 'SEGUNDA ETAPA', 'TERCERA ETAPA'];
    backgroundColor = ['#ff1100', '#dbc200', '#1dad00', '#F49917', '#17A2B7', '#23BE08'];
    hoverBackgroundColor = ['#ff1100', '#dbc200', '#1dad00', '#F49917', '#17A2B7', '#23BE08'];

    constructor(
        private pozoService: PozoService
    ) {
    }

    ngOnInit() {
        this.getConteoSemanal();
    }

    getConteoSemanal() {
        this.pozoService.getConteoSemanal()
        .then(conteoSemanal => {
            console.log(conteoSemanal);
            this.data = {
                labels: this.labels,
                datasets: [
                    {
                        data: conteoSemanal,
                        backgroundColor: this.backgroundColor,
                        hoverBackgroundColor: this.hoverBackgroundColor
                    }]
            };
          });
    }
}
