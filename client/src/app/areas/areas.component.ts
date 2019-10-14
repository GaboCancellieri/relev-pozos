import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Area } from './area';
import { AreaService } from './area.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './areas.component.html',
  animations: [routerTransition()]
})
export class AreaComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;
  @ViewChild('cerrarEditar') cerrarEditar: ElementRef;

  model: any = {};
  areas: Area[] = [];
  cols: any[];
  selectedArea: Area;

  constructor(
    private areaService: AreaService
  ) { }


  ngOnInit() {
    this.getAreas();

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
    ];
  }

  // GET OBRAS
  getAreas() {
    this.areaService.getAreas()
      .then(areas => {
        this.areas = areas;
      });
  }

  // ***************
  // *** AGREGAR ***
  // ***************
  cargarArea(f: NgForm) {
    this.areaService.cargarArea(this.model.cuitArea, this.model.nombreArea,
       this.model.direccionArea, this.model.telefonoArea, this.model.emailArea)
      .then(areaAgregada => {
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Agregado!',
          text: 'Se ha creado la area correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.areas.push(areaAgregada);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        this.model = {};
        f.resetForm();
      });
  }

  // ******************
  // *** ACTUALIZAR ***
  // ******************
  editarArea(f: NgForm) {
    this.areaService.editarArea(this.selectedArea._id,
      this.selectedArea.nombre)
      .then(areaEditada => {

        // cierro el modal
        this.cerrarEditar.nativeElement.click();

        // Muestro un mensajito de Actualizado con Éxito
        Swal.fire({
          title: 'Actualizada!',
          text: 'Se ha actualizado el area correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        let i = 0;
        this.areas.forEach(area => {
          if (area._id === areaEditada._id) {
            this.areas[i] = areaEditada;
          }
          i++;
        });

        f.resetForm();
        this.selectedArea = null;
      });
  }

  // ****************
  // *** ELIMINAR ***
  // ****************
  eliminarArea() {
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
          this.areaService.deleteArea(this.selectedArea._id)
            .then(areaEliminada => {
              Swal.fire(
                'Eliminado!',
                'Relevador eliminado correctamente',
                'success'
              );
              // Elimino el relevador del arreglo de relevadores (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del relevador eliminado
              this.areas.forEach((area, index) => {
                if (area._id === areaEliminada._id) {
                  i = index;
                }
              });

              // 'splice' corta el arreglo justo en el indice 'i'
              this.areas.splice(i, 1);

              // Reseteo el relevador seleccionado a null
              this.selectedArea = null;
            });
        } else {
          // Reseteo el relevador seleccionado a null
          this.selectedArea = null;
        }
      });
  }

  // *************
  // *** OTROS ***
  // *************

}

