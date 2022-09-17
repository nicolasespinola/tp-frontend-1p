import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Persona } from './persona';

export class Reserva {
    idReserva!: number;
    fecha!: string;
    horaInicio!: string;
    horaFin!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
    observacion!: string;
    fechaCadena!: string;
    horaInicioCadena!: string;
    horaFinCadena!: string;
}
