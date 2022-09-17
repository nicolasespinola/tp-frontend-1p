import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/listadatos';
import { Persona } from '../model/persona';

@Injectable({
    providedIn: 'root',
})
export class ServiceloginService {
    private api: string =
        'http://181.123.243.5:8080/stock-pwfe/persona?ejemplo=%7B%22soloUsuariosDelSistema%22%3Atrue%7D';

    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<listadatos<Persona>> {
        return this.http.get<listadatos<Persona>>(this.api);
    }
}
