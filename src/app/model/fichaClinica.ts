import { Persona } from './persona';
import { tipoProducto } from './tipoProducto';

export class FichaClinica {
  idFichaClinica!: number;
  motivoConsulta!: string;
  diagnostico!: string;
  observacion?: string;
  fechaHora!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;
  idTipoProducto!: tipoProducto;
  fechaDesdeCadena?: string;
  fechaHastaCadena?: string;
}
