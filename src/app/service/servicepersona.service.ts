import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listadatos } from '../model/listadatos';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class ServicepersonaService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona";
  constructor(private http: HttpClient) { }

  getAll(): Observable<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(this.api);
  }

  getById(idPersona:string): Observable<Persona> {
    return this.http.get<Persona>(this.api+'/'+idPersona);
  }

  getPersonasParams(params: HttpParams): Observable<listadatos<Persona>> {
    if(params==null){
      return this.http.get<listadatos<Persona>>(this.api);
    }else{
      return this.http.get<listadatos<Persona>>(this.api,{params});
    }
  }

  postPersona(p:Persona): Observable<Persona>{
    return this.http.post<Persona>(this.api, p)
      .pipe(
        tap(
          data => console.log('agregado' + data),
          error => console.log(error)
        )
      );
  }

  updatePersona(p: Persona, idPersona: string): Observable<Persona>{
    p.idPersona = parseInt(idPersona)
    return this.http.put<Persona>(this.api, p).pipe(
      tap(
        data => console.log("Actualizado: " + idPersona),
        error => console.log("Error: " + error)
      )
    )
  }

  deletePersona(p: Persona, idPersona: string): Observable<Persona>{
    p.idPersona = parseInt(idPersona)
    return this.http.delete<Persona>(this.api + '/' + idPersona).pipe(
      tap(
        data => console.log("Borrado: " + idPersona),
        error => console.log("Error: " + error)
      )
    )
  }



}
