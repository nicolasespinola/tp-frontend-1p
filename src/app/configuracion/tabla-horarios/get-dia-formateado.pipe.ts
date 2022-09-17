import { Pipe, PipeTransform } from '@angular/core';
import {DiaAgenda} from "../../model/horarioAgenda";

@Pipe({
  name: 'getDiaFormateado'
})
export class GetDiaFormateadoPipe implements PipeTransform {

  transform(dia: DiaAgenda): string {
    switch (dia) {
      case DiaAgenda.LUNES:
        return "Lunes";
      case DiaAgenda.MARTES:
        return "Martes";
      case DiaAgenda.MIERCOLES:
        return "Miércoles";
      case DiaAgenda.JUEVES:
        return "Jueves";
      case DiaAgenda.VIERNES:
        return "Viernes";
      case DiaAgenda.SABADO:
        return "Sábado";
      case DiaAgenda.DOMINGO:
        return "Domingo";
      default:
        return "Inválido";
    }
  }

}
