import { FichaClinica } from './fichaClinica';
import { Persona } from './persona';

export default class Servicio {
    idServicio!: number;
    idFichaClinica!: FichaClinica;
    observacion!: FichaClinica;
    fechaDesdeCadena!: string;
    fechaHastaCadena!: string;
    fechaHora!: string;
    idEmpleado!: Persona;
    presupuesto!: number;
}
