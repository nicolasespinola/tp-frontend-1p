import { Persona } from './persona';

export class horarioExcepcion {
    idHorarioExcepcion!: number;
    fecha!: Date;
    flagEsHabilitar!: string;
    idEmpleado!: Persona;
    horaAperturaCadena!: string;
    horaCierreCadena!: string;
    fechaCadena!: string;
    intervaloMinutos!: number;
    horaApertura!: string;
    horaCierre!: string;
}
