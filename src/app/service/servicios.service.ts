import { Injectable } from '@angular/core';
import BASE_URL from './base_url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/listadatos';
import Servicio from '../model/servicio';
import { tap } from 'rxjs/operators';
import ServicioDetalle, {
    ExistenciaProducto,
    PresentacionProducto,
} from '../model/servicioDetalle';

@Injectable({
    providedIn: 'root',
})
export class ServiciosService {
    private api: string = BASE_URL + '/stock-pwfe/servicio';
    private apiPresentacion: string =
        BASE_URL + '/stock-pwfe/presentacionProducto';
    private apiExistencia: string = BASE_URL + '/stock-pwfe/existenciaProducto';
    private apiDetalle = (idServicio: number) =>
        `${this.api}/${idServicio}/detalle`;
    private apiDetalleID = (idServicio: number, idDetalle: number) =>
        `${this.apiDetalle(idServicio)}/${idDetalle}`;

    constructor(private http: HttpClient) {}

    // Obtiene los servicios
    getServicios(): Observable<listadatos<Servicio>> {
        return this.http.get<listadatos<Servicio>>(this.api);
    }

    // Obtener servicio desde un ejemplo
    getServicioEjemplo(ejemplo: Servicio): Observable<listadatos<Servicio>> {
        return this.http.get<listadatos<Servicio>>(this.api, {
            params: {
                ejemplo: JSON.stringify(ejemplo),
            },
        });
    }

    // Crea un servicio
    crearServicio(servicio: Servicio): Observable<Servicio> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http
            .post<Servicio>(this.api, servicio, {
                headers,
            })
            .pipe(
                tap(
                    (next) => console.log('Agregado: ' + next),
                    (error) => console.error(error)
                )
            );
    }

    // Crea detalle de servicio
    crearDetalleServicio(
        detalle: ServicioDetalle
    ): Observable<ServicioDetalle[]> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http
            .post<ServicioDetalle[]>(
                this.apiDetalle(detalle.idServicio.idServicio),
                detalle,
                {
                    headers,
                }
            )
            .pipe(
                tap(
                    (next) => console.log('Agregado: ' + next),
                    (error) => console.error(error)
                )
            );
    }

    // Eliminar detalle de servicio
    eliminarDetalleServicio(
        idServicio: number,
        idDetalle: number
    ): Observable<any> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http
            .delete(this.apiDetalleID(idServicio, idDetalle), {
                headers,
            })
            .pipe(
                tap(
                    (next) => console.log('Eliminado: ' + next),
                    (error) => console.error(error)
                )
            );
    }

    // Obtiene los detalles de un servicio
    getDetallesDeServicio(idServicio: number): Observable<ServicioDetalle[]> {
        return this.http.get<ServicioDetalle[]>(this.apiDetalle(idServicio));
    }

    // Obtiene las presentaciones de producto en base a un ejemplo
    getPresentacionesProducto(
        ejemplo: PresentacionProducto
    ): Observable<listadatos<PresentacionProducto>> {
        return this.http.get<listadatos<PresentacionProducto>>(
            this.apiPresentacion,
            {
                params: {
                    ejemplo: JSON.stringify(ejemplo),
                },
            }
        );
    }

    // Obtiene una presetación producto especifico
    getPresentacionProducto(id: number): Observable<PresentacionProducto> {
        return this.http.get<PresentacionProducto>(
            this.apiPresentacion + `/${id}`
        );
    }

    // Obtiene la existencia de producto
    getExistenciaProducto(
        idPresentacion: number
    ): Observable<listadatos<ExistenciaProducto>> {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const headers = new HttpHeaders({ usuario: usuario.usuarioLogin });
        return this.http.get<listadatos<ExistenciaProducto>>(
            this.apiExistencia,
            {
                params: {
                    ejemplo: JSON.stringify({
                        idPresentacionProductoTransient: idPresentacion,
                    }),
                },
                headers,
            }
        );
    }
}
