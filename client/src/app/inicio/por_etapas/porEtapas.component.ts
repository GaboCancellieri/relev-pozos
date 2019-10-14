import { Component, OnInit } from '@angular/core';
import { PozoService } from '../../pozos/pozo.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-por-etapas',
  templateUrl: './porEtapas.component.html',
})
export class PorEtapasComponent implements OnInit {

  conteo: any;

  constructor(
    private pozoService: PozoService
  ) {
  }

  ngOnInit() {
    this.getContarPozos();
  }

  getContarPozos() {
    this.pozoService.getConteoEtapa()
    .then(conteoPozos => {
      this.conteo = conteoPozos;
    });
  }
}
