import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listadatos } from '../model/listadatos';
import { Persona } from '../model/persona';
import { Reserva } from '../model/reserva';
import BASE_URL from './base_url';

@Injectable({
    providedIn: 'root',
})
export class ServicereservaService {
    private api: string = BASE_URL + '/stock-nutrinatalia/reserva';
    private agenda: string = BASE_URL + '/stock-nutrinatalia/persona';

    constructor(private http: HttpClient) {}

    getReservasHoy(): Observable<listadatos<Reserva>> {
        const date = new Date();
        const string_date = `${date.getFullYear()}${(
            '0' +
            (date.getMonth() + 1)
        ).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
        const params = {
            fechaDesdeCadena: string_date,
            fechaHastaCadena: string_date,
        };
        return this.http.get<listadatos<Reserva>>(this.api, {
            params: {
                ejemplo: JSON.stringify(params),
            },
        });
    }

    getPacientes(
        params: Object,
        like: string
    ): Observable<listadatos<Persona>> {
        return this.http.get<listadatos<Persona>>(
            'https://equipoyosh.com/stock-nutrinatalia/persona',
            {
                params: { ejemplo: JSON.stringify(params), like: like },
            }
        );
    }

    getEmpleados(
        params: Object,
        like: string
    ): Observable<listadatos<Persona>> {
        const ejemplo = { ...params, soloUsuariosDelSistema: true };

        return this.http.get<listadatos<Persona>>(
            'https://equipoyosh.com/stock-nutrinatalia/persona',
            {
                params: {
                    ejemplo: JSON.stringify(ejemplo),
                    like: like,
                },
            }
        );
    }

    getReservas(params: Object) {
        return this.http.get<listadatos<Reserva>>(this.api, {
            params: {
                ejemplo: JSON.stringify(params),
            },
        });
    }

    getAgenda(idEmpleado: number, params: HttpParams) {
        return this.http.get<Reserva[]>(this.agenda + `/${idEmpleado}/agenda`, {
            params: params,
        });
    }

    postReserva(data: Object) {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http
            .post<Reserva>(this.api, data, { headers: headers })
            .pipe(
                tap(
                    (data) => console.log('agregado ' + data),
                    (error) => console.log('error: ' + error)
                )
            );
    }

    deleteReserva(id: number) {
        return this.http.delete(`${this.api}/${id}`);
    }

    putReserva(body: Object) {
        return this.http.put(this.api, body);
    }
}
