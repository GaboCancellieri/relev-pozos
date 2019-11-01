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

    getConteoSemanal(semana: string): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/semanal/etapa/' + semana)
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

    getConteoAcumuladoPorEtapa(etapa: string): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/acumulado/por/etapa/' + etapa)
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    getRelevPozos(nomRelev: string, semana: string): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/' + nomRelev + '/' + semana)
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    getRelevMesPozos(nomRelev: string): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/mes/por/relevador/' + nomRelev)
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    getGeneralMensual(): Promise<any> {
        return this.http.get(this.pozoURL + '/conteo/acumulado/general/por/mes/')
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
        idPozo,
        nombre,
        coordenadas,
        estado,
        fecha,
        idRelevador,
        idEtapa): Promise<Pozo> {
        return this.http.patch(this.pozoURL + '/' + idPozo,
            JSON.stringify({
                nombre, coordenadas, estado, fecha,
                idRelevador, idEtapa
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
