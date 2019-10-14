import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Relevador } from './relevador';
import Swal from 'sweetalert2';



@Injectable()
export class RelevadorService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private relevadorURL = this.urlService.getRestApiUrl() + '/relevador';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getRelevadores(): Promise<Relevador[]> {
        return this.http.get(this.relevadorURL)
            .toPromise()
            .then(response => response.json().obj as Relevador[])
            .catch(this.handleError);
    }

    cargarRelevador(
        nombre: string,
        apellido: string,
        telefono: string,
        mail: string,
        area: string): Promise<Relevador> {
        return this.http.post(this.relevadorURL,
            JSON.stringify({
                nombre, apellido, telefono,
                mail, area
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Relevador)
            .catch(this.handleError);
    }

    editarRelevador(
        idRep: string,
        nombre: string,
        apellido: string,
        telefono: string,
        mail: string,
        area: string): Promise<Relevador> {
        return this.http.patch(this.relevadorURL + '/' + idRep,
            JSON.stringify({
                nombre, apellido,
                telefono, mail,
                area
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Relevador)
            .catch(this.handleError);
    }

    deleteRelevador(idRep: string): Promise<Relevador> {
        return this.http.delete(this.relevadorURL + '/' + idRep)
            .toPromise()
            .then(response => response.json().obj as Relevador)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Relevadores: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
