import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Persona } from 'src/app/model/persona';
import { HorarioExcepcionService } from 'src/app/service/horario-excepcion.service';

@Component({
    selector: 'app-nueva-excepcion',
    templateUrl: './nueva-excepcion.component.html',
    styleUrls: ['./nueva-excepcion.component.css'],
})
export class NuevaExcepcionComponent implements OnInit {
    fecha!: string;
    horaApertura!: string;
    horaCierre!: string;
    habilitar: boolean = false;
    fisioterapeutas: Persona[] = [];
    fisioterapeutaSeleccionado: Persona | null = null;
    intervaloMinutos!: number;

    constructor(
        public activeModal: NgbActiveModal,
        private servicioExcepciones: HorarioExcepcionService
    ) {}

    ngOnInit(): void {
        this.servicioExcepciones.getEmpleados().subscribe(
            (entity) => (this.fisioterapeutas = entity.lista),
            (error) => console.log(error)
        );
    }

    formatearFecha(date: Date) {
        const string_date = `${date.getFullYear()}${(
            '0' +
            (date.getMonth() + 1)
        ).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

        return string_date;
    }

    submit() {
        const body: { [k: string]: any } = {};
        body['fechaCadena'] = this.formatearFecha(moment(this.fecha).toDate());
        body['idEmpleado'] = { idPersona: this.fisioterapeutaSeleccionado };
        body['flagEsHabilitar'] = this.habilitar;
        if (this.habilitar) {
            body['horaAperturaCadena'] = this.horaApertura.replace(':', '');
            body['horaCierreCadena'] = this.horaCierre.replace(':', '');
            body['intervaloMinutos'] = this.intervaloMinutos;
        }
        this.servicioExcepciones.postExcepcion(body).subscribe(
            () => this.activeModal.close(),
            (error) => console.log(error)
        );
    }
}
