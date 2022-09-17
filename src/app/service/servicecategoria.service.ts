import { Injectable } from '@angular/core';
import BASE_URL from './base_url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Categoria } from '../model/categoria';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ServicecategoriaService {
    private api: string = BASE_URL + '/stock-nutrinatalia/categoria';
    constructor(private http: HttpClient) {}

    getCategorias(): Observable<listadatos<Categoria>> {
        return this.http.get<listadatos<Categoria>>(this.api);
    }

    getCategoriasParams(params: HttpParams): Observable<listadatos<Categoria>> {
        if (params == null) {
            return this.http.get<listadatos<Categoria>>(this.api);
        } else {
            return this.http.get<listadatos<Categoria>>(this.api, { params });
        }
    }

    agregarCategoria(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(this.api, categoria).pipe(
            tap(
                (data) => console.log('Agregado: ' + data),
                (error) => console.log('Error: ' + error)
            )
        );
    }

    updateCategoria(
        categoria: Categoria,
        idCategoria: string
    ): Observable<Categoria> {
        categoria.idCategoria = parseInt(idCategoria);
        return this.http.put<Categoria>(this.api, categoria).pipe(
            tap(
                (data) => console.log('Actualizado: ' + idCategoria),
                (error) => console.log('Error: ' + error)
            )
        );
    }

    borrarCategoria(
        categoria: Categoria,
        idCategoria: string
    ): Observable<Categoria> {
        categoria.idCategoria = parseInt(idCategoria);
        return this.http.delete<Categoria>(this.api + '/' + idCategoria).pipe(
            tap(
                (data) => console.log('Borrado: ' + idCategoria),
                (error) => console.log('Error: ' + error)
            )
        );
    }
}
