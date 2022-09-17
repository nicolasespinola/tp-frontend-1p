import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'getHoraFormateda' })
export class GetHoraFormateadaPipe implements PipeTransform {
  transform(hora: string): string {
    let regex = /([0-9][0-9])([0-9][0-9])/;
    return hora.replace(regex, "$1:$2");
  }
}
