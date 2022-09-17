import {Pipe, PipeTransform} from '@angular/core';
import Servicio from "../model/servicio";

@Pipe({
    name: 'getFechaFromServicio'
})
export class GetFechaFromServicioPipe implements PipeTransform {

    transform(servicio: Servicio): String {
        let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/;
        return servicio.fechaHora.replace(regex, "$1-$2-$3");
    }

}
