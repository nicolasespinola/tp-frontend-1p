import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { horarioExcepcion } from '../model/horarioExcepcion';
import { listadatos } from '../model/listadatos';
import { Persona } from '../model/persona';
import BASE_URL from './base_url';

@Injectable({
    providedIn: 'root',
})
export class HorarioExcepcionService {
    private api: string = BASE_URL + '/stock-pwfe/horarioExcepcion';
    private apiPersonas: string = BASE_URL + '/stock-pwfe/persona';

    constructor(private http: HttpClient) {}

    getExcepciones(params: Object): Observable<listadatos<horarioExcepcion>> {
        return this.http.get<listadatos<horarioExcepcion>>(this.api, {
            params: { ejemplo: JSON.stringify(params) },
        });
    }

    getEmpleados(): Observable<listadatos<Persona>> {
        return this.http.get<listadatos<Persona>>(this.apiPersonas, {
            params: {
                ejemplo: JSON.stringify({ soloUsuariosDelSistema: true }),
            },
        });
    }

    postExcepcion(body: Object) {
        return this.http.post<horarioExcepcion>(this.api, body).pipe(
            tap(
                (data) => console.log('agregado ' + data),
                (error) => console.log('error: ' + error)
            )
        );
    }
}
