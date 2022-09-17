import { Injectable } from '@angular/core';
import BASE_URL from './base_url';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { tipoProducto } from '../model/tipoProducto';
import { Categoria } from '../model/categoria';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ServicetipoProductoService {
    private api: string = BASE_URL + '/stock-nutrinatalia/tipoProducto';
    constructor(private http: HttpClient) {}

    gettipoProductos(): Observable<listadatos<tipoProducto>> {
        return this.http.get<listadatos<tipoProducto>>(this.api);
    }
    agregartipoProducto(tipoProducto: tipoProducto): Observable<tipoProducto> {
        return this.http.post<tipoProducto>(this.api, tipoProducto).pipe(
            tap(
                (data) => console.log('Agregado: ' + data),
                (error) => console.log('Error: ' + error)
            )
        );
    }
    getTipoProductos(): Observable<listadatos<tipoProducto>> {
        return this.http.get<listadatos<tipoProducto>>(this.api);
    }

    getCategorias(): Observable<listadatos<Categoria>> {
        return this.http.get<listadatos<Categoria>>(
            BASE_URL + '/stock-nutrinatalia/categoria'
        );
    }

    getTipoProductosParams(
        params: HttpParams
    ): Observable<listadatos<tipoProducto>> {
        if (params == null) {
            return this.http.get<listadatos<tipoProducto>>(this.api);
        } else {
            return this.http.get<listadatos<tipoProducto>>(this.api, {
                params,
            });
        }
    }

    agregarTipoProducto(tipoProducto: tipoProducto): Observable<tipoProducto> {
        return this.http.post<tipoProducto>(this.api, tipoProducto).pipe(
            tap(
                (data) => console.log('Agregado: ' + data),
                (error) => console.log('Error: ' + error)
            )
        );
    }

    updateTipoProducto(
        tipoProducto: tipoProducto,
        idTipoProducto: string
    ): Observable<tipoProducto> {
        tipoProducto.idTipoProducto = parseInt(idTipoProducto);
        return this.http.put<tipoProducto>(this.api, tipoProducto).pipe(
            tap(
                (data) => console.log('Actualizado: ' + data),
                (error) => console.log('Error: ' + error)
            )
        );
    }

    borrarTipoProducto(
        tipoProducto: tipoProducto,
        idTipoProducto: string
    ): Observable<tipoProducto> {
        tipoProducto.idTipoProducto = parseInt(idTipoProducto);
        return this.http
            .delete<tipoProducto>(this.api + '/' + idTipoProducto)
            .pipe(
                tap(
                    (data) => console.log('Borrado: ' + idTipoProducto),
                    (error) => console.log('Error: ' + error)
                )
            );
    }
}
