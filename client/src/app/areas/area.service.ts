import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';
import { Area } from './area';




@Injectable()
export class AreaService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private areaURL = this.urlService.getRestApiUrl() + '/area';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getAreas(): Promise<Area[]> {
        return this.http.get(this.areaURL)
            .toPromise()
            .then(response => response.json().obj as Area[])
            .catch(this.handleError);
    }

    getArea(idArea: string): Promise<Area> {
        return this.http.get(this.areaURL + '/' + idArea)
            .toPromise()
            .then(response => response.json().obj as Area)
            .catch(this.handleError);
    }

    getAreasNoAsignadas(idMedico: string): Promise<Area[]> {
        return this.http.get(this.areaURL + '/areasNoAsignadas/' + idMedico)
            .toPromise()
            .then(response => response.json().obj as Area[])
            .catch(this.handleError);
    }

    cargarArea(
        cuitFar: string,
        nombreFar: string,
        direccionFar: string,
        telefonoFar: string,
        emailFar: string): Promise<Area> {
        return this.http.post(this.areaURL,
            JSON.stringify({
                cuitArea: cuitFar, nombreArea: nombreFar,
                telefonoArea: telefonoFar, direccionArea: direccionFar,
                emailArea: emailFar
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Area)
            .catch(this.handleError);
    }

    editarArea(
        idArea: string,
        nombre: string): Promise<Area> {
        return this.http.patch(this.areaURL + '/' + idArea,
            JSON.stringify({
                nombre
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Area)
            .catch(this.handleError);
    }

    deleteArea(idPac: string): Promise<Area> {
        return this.http.delete(this.areaURL + '/' + idPac)
            .toPromise()
            .then(response => response.json().obj as Area)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Areas: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
