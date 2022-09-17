import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/listadatos';
import { Persona } from '../model/persona';
import Servicio from '../model/servicio';
import ServicioDetalle from '../model/servicioDetalle';
import BASE_URL from './base_url';

@Injectable({
  providedIn: 'root'
})
export class ServicereporteService {

  private api: string = BASE_URL + "/stock-pwfe/servicio";
  private apiDetalle = (idServicio: number) => `${this.api}/${idServicio}/detalle`;

  constructor(private http: HttpClient) { }

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api);
  }

  getServicioEjemplo(ejemplo: Servicio): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api, {
        params: {
            ejemplo: JSON.stringify(ejemplo)
        }
  })};

  getServiciosParams(params: Object): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api, {
      params: {
          ejemplo: JSON.stringify(params),
      },
    });
  }

  getDetallesParams(params: Object): Observable<listadatos<ServicioDetalle>> {
    return this.http.get<listadatos<ServicioDetalle>>(this.api, {
      params: {
          detalle: 'S',
          ejemplo: JSON.stringify(params),
      },
    });
  }

  getDetallesDeServicio(idServicio: number): Observable<ServicioDetalle[]> {
    return this.http.get<ServicioDetalle[]>(this.apiDetalle(idServicio));
  }

  getPacientes(
    params: Object,
    like: string
  ): Observable<listadatos<Persona>> {
      return this.http.get<listadatos<Persona>>(
          'http://181.123.243.5:8080/stock-pwfe/persona',
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
          'http://181.123.243.5:8080/stock-pwfe/persona',
          {
              params: {
                  ejemplo: JSON.stringify(ejemplo),
                  like: like,
              },
          }
      );
  }

}
