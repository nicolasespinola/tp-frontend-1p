import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listadatos } from '../model/listadatos';
import { PresentacionProducto, Producto } from '../model/presentacionProducto';

@Injectable({
    providedIn: 'root',
})
export class ServicepresentacionService {
    private api: string = 'https://equipoyosh.com/stock-nutrinatalia/';

    constructor(private http: HttpClient) {}

    getAll(): Observable<listadatos<PresentacionProducto>> {
        return this.http.get<listadatos<PresentacionProducto>>(
            this.api + 'presentacionProducto'
        );
    }

    getProductos(): Observable<listadatos<Producto>> {
        return this.http.get<listadatos<Producto>>(this.api + 'producto');
    }

    getPresentacionParams(
        parametros: any,
        like: string
    ): Observable<listadatos<PresentacionProducto>> {
        return this.http.get<listadatos<PresentacionProducto>>(
            this.api + 'presentacionProducto',
            {
                params: {
                    ejemplo: JSON.stringify(parametros),
                    like: like,
                },
            }
        );
    }

    postPresentacion(
        p: PresentacionProducto
    ): Observable<PresentacionProducto> {
        return this.http
            .post<PresentacionProducto>(this.api + 'presentacionProducto', p)
            .pipe(
                tap(
                    (data) => console.log('agregado' + data),
                    (error) => console.log(error)
                )
            );
    }

    updatePresentacion(
        p: PresentacionProducto,
        idPresentacionProducto: string
    ): Observable<PresentacionProducto> {
        p.idPresentacionProducto = parseInt(idPresentacionProducto);
        return this.http
            .put<PresentacionProducto>(this.api + 'presentacionProducto', p)
            .pipe(
                tap(
                    (data) =>
                        console.log('Actualizado: ' + idPresentacionProducto),
                    (error) => console.log('Error: ' + error)
                )
            );
    }

    deletePresentacioni(
        p: PresentacionProducto,
        idPresentacionProducto: string
    ): Observable<PresentacionProducto> {
        p.idPresentacionProducto = parseInt(idPresentacionProducto);
        return this.http
            .delete<PresentacionProducto>(
                this.api + 'presentacionProducto' + '/' + idPresentacionProducto
            )
            .pipe(
                tap(
                    (data) => console.log('Borrado: ' + idPresentacionProducto),
                    (error) => console.log('Error: ' + error)
                )
            );
    }
}
