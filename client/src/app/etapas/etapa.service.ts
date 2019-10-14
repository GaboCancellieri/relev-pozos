import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';
import { Etapa } from './etapa';

@Injectable()
export class EtapaService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private etapaURL = this.urlService.getRestApiUrl() + '/etapa';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getEtapas(): Promise<Etapa[]> {
        return this.http.get(this.etapaURL)
            .toPromise()
            .then(response => response.json().obj as Etapa[])
            .catch(this.handleError);
    }

    getEtapa(idEtapa: string): Promise<Etapa> {
        return this.http.get(this.etapaURL + '/' + idEtapa)
            .toPromise()
            .then(response => response.json().obj as Etapa)
            .catch(this.handleError);
    }

    getEtapasNoAsignadas(idMedico: string): Promise<Etapa[]> {
        return this.http.get(this.etapaURL + '/etapasNoAsignadas/' + idMedico)
            .toPromise()
            .then(response => response.json().obj as Etapa[])
            .catch(this.handleError);
    }

    cargarEtapa(
        nombre: string,
        fechaLimite: Date): Promise<Etapa> {
        return this.http.post(this.etapaURL,
            JSON.stringify({
                nombre, fechaLimite
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Etapa)
            .catch(this.handleError);
    }

    editarEtapa(
        idEtapa: string,
        nombre: string,
        fechaLimite: Date): Promise<Etapa> {
        return this.http.patch(this.etapaURL + '/' + idEtapa,
            JSON.stringify({
                nombre, fechaLimite
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Etapa)
            .catch(this.handleError);
    }

    deleteEtapa(idEtapa: string): Promise<Etapa> {
        return this.http.delete(this.etapaURL + '/' + idEtapa)
            .toPromise()
            .then(response => response.json().obj as Etapa)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Etapas: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
