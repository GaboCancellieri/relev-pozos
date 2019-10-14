import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Pozo } from './pozo';
import Swal from 'sweetalert2';



@Injectable()
export class PozoService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private pozoURL = this.urlService.getRestApiUrl() + '/pozo';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    // ***********
    // *** GET ***
    // ***********
    getPozos(): Promise<Pozo[]> {
        return this.http.get(this.pozoURL)
            .toPromise()
            .then(response => {
                console.log(response.json().obj);
                return response.json().obj as Pozo[];
            })
            .catch(this.handleError);
    }

    getPozo(idPozo: string): Promise<Pozo> {
        return this.http.get(this.pozoURL + '/' + idPozo)
            .toPromise()
            .then(response => response.json().obj as Pozo)
            .catch(this.handleError);
    }

    getConteoEtapa(): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/etapa')
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    getConteoSemanal(): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/semanal/etapa')
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    getConteoAcumulado(): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/acumulado/etapa')
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    // ************
    // *** POST ***
    // ************
    cargarPozo(
        nombre,
        coordenadas,
        estado,
        fecha,
        idRelevador,
        idArea,
        idEtapa): Promise<Pozo> {

        return this.http.post(this.pozoURL,
            JSON.stringify({
                nombre, coordenadas,
                estado, fecha, idRelevador, idArea, idEtapa
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Pozo)
            .catch(this.handleError);
    }

    // *************
    // *** PATCH ***
    // *************
    editarPozo(
        idPac: string,
        nombrePac: string,
        apellidoPac: string,
        telefonoPac: string,
        direccionPac: string,
        barrioPac: string,
        fechaNacimientoPac: Date): Promise<Pozo> {
        return this.http.patch(this.pozoURL + '/' + idPac,
            JSON.stringify({
                nombrePozo: nombrePac,
                apellidoPozo: apellidoPac, telefonoPozo: telefonoPac, direccionPozo: direccionPac,
                barrioPozo: barrioPac, fechaNacimientoPozo: fechaNacimientoPac
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Pozo)
            .catch(this.handleError);
    }

    // **************
    // *** DELETE ***
    // **************
    deletePozo(idPac: string): Promise<Pozo> {
        return this.http.delete(this.pozoURL + '/' + idPac)
            .toPromise()
            .then(response => response.json().obj as Pozo)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Pozos: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
