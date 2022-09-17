import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import BASE_URL from './base_url';
import { Observable } from 'rxjs';
import { listadatos } from '../model/listadatos';
import { HorarioAgenda } from '../model/horarioAgenda';
import { tap } from 'rxjs/operators';
import { Persona } from '../model/persona';

@Injectable({
    providedIn: 'root',
})
export class HorarioAgendaService {
    private api: string = BASE_URL + '/stock-nutrinatalia/personaHorarioAgenda';
    private apiPersonas: string = BASE_URL + '/stock-nutrinatalia/persona';

    constructor(private http: HttpClient) {}

    // Obtiene los horarios de los empleados
    getHorarios(): Observable<listadatos<HorarioAgenda>> {
        return this.http.get<listadatos<HorarioAgenda>>(this.api);
    }

    // Obtiene los horarios que cumplen con el filtro
    getEjemploHorarios(
        ejemplo: HorarioAgenda
    ): Observable<listadatos<HorarioAgenda>> {
        return this.http.get<listadatos<HorarioAgenda>>(this.api, {
            params: {
                ejemplo: JSON.stringify(ejemplo),
            },
        });
    }

    // Agrega un nuevo registro a los horarios de los empleados
    agregarHorario(horario: HorarioAgenda): Observable<HorarioAgenda> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http
            .post<HorarioAgenda>(this.api, horario, {
                headers,
            })
            .pipe(
                tap(
                    (data) => console.log('Agregado: ' + data),
                    (error) => console.log('Error: ' + error)
                )
            );
    }

    getEmpleados(): Observable<listadatos<Persona>> {
        return this.http.get<listadatos<Persona>>(this.apiPersonas, {
            params: {
                ejemplo: JSON.stringify({ soloUsuariosDelSistema: true }),
            },
        });
    }
}
