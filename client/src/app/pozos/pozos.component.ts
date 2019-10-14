import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Pozo } from './pozo';
import { PozoService } from './pozo.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { RelevadorService } from '../relevadores/relevador.service';
import { AreaService } from '../areas/area.service';
import { Relevador } from '../relevadores/relevador';
import { Area } from '../areas/area';
import { EstadoPozo } from './estadoPozo';
import { EtapaService } from '../etapas/etapa.service';
import { Etapa } from '../etapas/etapa';


@Component({
  selector: 'app-productos',
  templateUrl: './pozos.component.html',
  animations: [routerTransition()]
})
export class PozoComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;

  model: any = {};
  pozos: Pozo[] = [];
  auxPozos: Pozo[] = [];
  cols: any[];
  selectedPozo: Pozo;

  relevadores: Relevador[];
  selectedRelevador: Relevador;

  areas: Area[];
  selectedArea: Area;

  etapas: Etapa[];
  selectedEtapa: Etapa;

  constructor(
    private pozoService: PozoService,
    private relevadorService: RelevadorService,
    private areaService: AreaService,
    private etapaService: EtapaService
  ) { }


  ngOnInit() {
    this.getPozos();
    this.getRelevadores();
    this.getAreas();
    this.getEtapas();
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'etapa', header: 'Etapa' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'relevador', header: 'Relevador' },
      { field: 'yacimiento', header: 'Yacimiento' },
      { field: 'provincia', header: 'Provincia' },
      { field: 'region', header: 'Region' },
      { field: 'coordenadas', header: 'Coordenadas' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getPozos() {
    this.pozoService.getPozos()
      .then(pozos => {
        this.pozos = pozos;
        this.auxPozos = pozos;
      });
  }

  getRelevadores() {
    this.relevadorService.getRelevadores()
      .then(relevadores => {
        this.relevadores = relevadores;
      });
  }

  getAreas() {
    this.areaService.getAreas()
      .then(areas => {
        this.areas = areas;
      });
  }

  getEtapas() {
    this.etapaService.getEtapas()
      .then(etapas => {
        this.etapas = etapas;
      });
  }
  // ***************
  // *** AGREGAR ***
  // ***************
  cargarPozo(f: NgForm) {
    console.log('Cargar Pozo');
    let estado = this.model.selectedEstado;
    let fecha = this.model.fecha;
    let idRelevador;
    if (!this.model.selectedEstado) {
      estado = 'Pendiente';
      fecha = new Date();
    } else {
      idRelevador = this.model.selectedRelevador._id;
    }

    this.pozoService.cargarPozo(this.model.nombre, this.model.coordenadas,
      estado, fecha, idRelevador, this.model.selectedArea._id, this.model.selectedEtapa._id)
      .then(pozoAgregado => {
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          type: 'success',
          title: 'Agregado!',
          text: 'Se ha creado el pozo correctamente.',
          showConfirmButton: false,
          timer: 1500
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.pozos.push(pozoAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        this.model = {};
        f.resetForm();
      });
  }

  reiniciarTabla() {
    if (!this.model.filtroNombre && !this.model.filtroFecha && !this.model.filtroArea &&
      !this.model.filtroCoordenadas && !this.model.filtroEstado && !this.model.filtroRelevador && !this.model.filtroEtapa) {
      this.pozos = this.auxPozos;
    }
  }

  filtrarNombre(nombre: string) {
    this.pozos = this.pozos.filter(pozo => pozo.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

  filtrarFecha(fecha: Date) {
    if (new Date(fecha.toString()).getFullYear().toString().length === 4) {
      this.pozos = this.pozos.filter(pozo => pozo.estado.estadoPozo.nombre !== 'Pendiente');
      this.pozos = this.pozos.filter(pozo => new Date(pozo.estado.fecha.toString()).toDateString() ===
        new Date(fecha.toString() + ' ').toDateString()
      );
    }
  }

  filtrarEstado(estado: string) {
    this.pozos = this.pozos.filter(pozo =>
      pozo.estado.estadoPozo.nombre.toLowerCase().includes(estado.toLowerCase()));
  }

  filtrarEtapa(etapa: string) {
    this.pozos = this.pozos.filter(pozo => pozo.etapa);
    this.pozos = this.pozos.filter(pozo =>
      pozo.etapa.nombre.toLowerCase().includes(etapa.toLowerCase()));
  }

  filtrarRelevador(relevador: string) {
    this.pozos = this.pozos.filter(pozo => pozo.relevador);
    this.pozos = this.pozos.filter(pozo =>
      (pozo.relevador.nombre.toLowerCase().includes(relevador.toLowerCase()) ||
      pozo.relevador.apellido.toLowerCase().includes(relevador.toLowerCase())
      ));
  }
}

