import { Injectable } from '@angular/core';
import BASE_URL from './base_url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/listadatos';
import { FichaClinica } from '../model/fichaClinica';
import { tap } from 'rxjs/operators';
import { Persona } from '../model/persona';

@Injectable({
    providedIn: 'root',
})
export class ServicefichaclinicaService {
    private api: string = BASE_URL + '/stock-pwfe/fichaClinica';
    private apiPersonas: string = BASE_URL + '/stock-pwfe/persona';

    constructor(private http: HttpClient) {}

    getFichas(): Observable<listadatos<FichaClinica>> {
        return this.http.get<listadatos<FichaClinica>>(this.api);
    }

    getEjemploFicha(
        ejemplo: FichaClinica
    ): Observable<listadatos<FichaClinica>> {
        return this.http.get<listadatos<FichaClinica>>(this.api, {
            params: {
                ejemplo: JSON.stringify(ejemplo),
            },
        });
    }

    agregarFichaClinica(ficha: FichaClinica): Observable<FichaClinica> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http
            .post<FichaClinica>(this.api, ficha, {
                headers,
            })
            .pipe(
                tap(
                    (data) => console.log('Agregado: ' + data),
                    (error) => console.log('Error: ' + error)
                )
            );
    }

    getPacientes(): Observable<listadatos<Persona>> {
        return this.http.get<listadatos<Persona>>(this.apiPersonas, {
            params: {
                ejemplo: JSON.stringify({ soloUsuariosDelSistema: false }),
            },
        });
    }

    getEmpleados(): Observable<listadatos<Persona>> {
        return this.http.get<listadatos<Persona>>(this.apiPersonas, {
            params: {
                ejemplo: JSON.stringify({ soloUsuariosDelSistema: true }),
            },
        });
    }

    modificarFichaClinica(ficha: FichaClinica): Observable<FichaClinica> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http.put<FichaClinica>(this.api, ficha, {
            headers,
        });
    }
}
