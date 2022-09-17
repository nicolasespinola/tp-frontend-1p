import {Persona} from "./persona";

export enum DiaAgenda {
  DOMINGO = 0,
  LUNES = 1,
  MARTES = 2,
  MIERCOLES = 3,
  JUEVES = 4,
  VIERNES = 5,
  SABADO = 6
}

export class HorarioAgenda {
  dia!: DiaAgenda;
  horaAperturaCadena!: string;
  horaCierreCadena!: string;
  intervaloMinutos!: number;
  idEmpleado!: Persona;
}
