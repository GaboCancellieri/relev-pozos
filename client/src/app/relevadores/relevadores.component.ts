import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Relevador } from './relevador';
import { RelevadorService } from './relevador.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Area } from '../areas/area';
import { AreaService } from '../areas/area.service';

@Component({
  selector: 'app-productos',
  templateUrl: './relevadores.component.html',
  animations: [routerTransition()]
})
export class RelevadorComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;
  @ViewChild('cerrarEditar') cerrarEditar: ElementRef;

  model: any = {};
  relevadores: Relevador[] = [];
  cols: any[];
  selectedRelevador: Relevador;

  areas: Area[];
  selectedArea: Area;

  constructor(
    private relevadorService: RelevadorService,
    private areaService: AreaService
  ) { }


  ngOnInit() {
    this.getRelevadores();
    this.getAreas();
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'mail', header: 'Mail' },
      { field: 'area', header: 'Area' }
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getRelevadores() {
    this.relevadorService.getRelevadores()
      .then(relevadores => {
        this.relevadores = relevadores;
        console.log(relevadores)
      });
  }

  getAreas() {
    this.areaService.getAreas()
      .then(areas => {
        this.areas = areas;
      });
  }

  // ***************
  // *** AGREGAR ***
  // ***************
  cargarRelevador(f: NgForm) {
    let idArea = null;
    if (this.model.selectedArea) {
      idArea = this.model.selectedArea._id;
    }

    this.relevadorService.cargarRelevador(this.model.nombre,
      this.model.apellido, this.model.telefono, this.model.mail, idArea)
      .then(relevadorAgregado => {
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Agregado!',
          text: 'Se ha creado el relevador correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.relevadores.push(relevadorAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        this.model = {};
        this.selectedArea = null;
        f.resetForm();
      });
  }

  // ******************
  // *** ACTUALIZAR ***
  // ******************
  editarRelevador(f: NgForm) {
    let idArea = null;
    if (this.selectedArea) {
      idArea = this.selectedArea._id;
    }

    this.relevadorService.editarRelevador(this.selectedRelevador._id,
      this.selectedRelevador.nombre,
      this.selectedRelevador.apellido,
      this.selectedRelevador.telefono,
      this.selectedRelevador.mail,
      idArea
      )
      .then(relevadorEditado => {
        // cierro el modal
        this.cerrarEditar.nativeElement.click();

        // Muestro un mensajito de Actualizado con Éxito
        Swal.fire({
          title: 'Actualizado!',
          text: 'Se ha actualizado el relevador correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // PARA ACTUALIZAR VISTA (TABLA)
        let i = 0;
        this.relevadores.forEach(elementoRelevador => {
          if (elementoRelevador._id === relevadorEditado._id) {
            this.relevadores[i] = relevadorEditado;
          }
          i++;
        });

        // Reseteo el selectedRelevador y el formulario de editar
        f.resetForm();
        this.selectedRelevador = null;
      });
  }

  // ****************
  // *** ELIMINAR ***
  // ****************
  eliminarRelevador() {
    // Mensajito: ¿ESTAS SEGURO?
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta acción no se puede revertir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          // SI ACEPTA
          this.relevadorService.deleteRelevador(this.selectedRelevador._id)
            .then(relevadorEliminado => {
              Swal.fire({
                title: 'Eliminado!',
                text: 'Relevador eliminado correctamente',
                type: 'success',
                showConfirmButton: false,
                timer: 1200
              });
              // Elimino el relevador del arreglo de relevadores (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del relevador eliminado
              this.relevadores.forEach((relevador, index) => {
                if (relevador._id === relevadorEliminado._id) {
                  i = index;
                }
              });

              // 'splice' corta el arreglo justo en el indice 'i'
              this.relevadores.splice(i, 1);

              // Reseteo el relevador seleccionado a null
              this.selectedRelevador = null;
            });
        } else {
          // Reseteo el relevador seleccionado a null
          this.selectedRelevador = null;
        }
      });
  }

  // ****************
  // *** OTROS ***
  // ****************
  setSelectedArea(relevador) {
    if (relevador.area) {
      for (const area of this.areas) {
        if (area._id === relevador.area._id) {
          this.selectedArea = area;
        }
      }
    }
  }
}

