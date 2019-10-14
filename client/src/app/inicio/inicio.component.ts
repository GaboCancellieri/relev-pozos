import { Component, OnInit } from '@angular/core';
import { PozoService } from '../pozos/pozo.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {

  types: SelectItem[];
  selectedType = 'Etapas';

  constructor(
    private pozoService: PozoService
  ) {
    this.types = [
      {label: 'Etapas', value: 'Etapas', icon: 'fas fa-align-justify'},
      {label: 'Grafico Semanal', value: 'Grafico Semanal', icon: 'fas fa-chart-pie'},
      {label: 'Grafico Acumulado', value: 'Grafico Acumulado', icon: 'fas fa-chart-pie'}
  ];
  }

  ngOnInit() {
  }
}
