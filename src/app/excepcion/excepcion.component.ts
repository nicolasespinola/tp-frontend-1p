import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { horarioExcepcion } from '../model/horarioExcepcion';
import { Persona } from '../model/persona';
import { HorarioExcepcionService } from '../service/horario-excepcion.service';
import { NuevaExcepcionComponent } from './nueva-excepcion/nueva-excepcion.component';

@Component({
    selector: 'app-excepcion',
    templateUrl: './excepcion.component.html',
    styleUrls: ['./excepcion.component.css'],
})
export class ExcepcionComponent implements OnInit {
    excepciones!: horarioExcepcion[];
    fisioterapeutas: Persona[] = [];
    fisioterapeutaSeleccionado: Persona | null = null;
    fecha: string = '';

    constructor(
        private servicioExcepciones: HorarioExcepcionService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.servicioExcepciones.getExcepciones({}).subscribe(
            (entity) => (this.excepciones = entity.lista),
            (error) => console.log(error)
        );

        this.servicioExcepciones.getEmpleados().subscribe(
            (entity) => (this.fisioterapeutas = entity.lista),
            (error) => console.log(error)
        );
    }

    limpiarFiltros() {
        this.fisioterapeutaSeleccionado = null;
        this.fecha = '';
        this.servicioExcepciones.getExcepciones({}).subscribe(
            (entity) => (this.excepciones = entity.lista),
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

    filtrar() {
        console.log(this.fisioterapeutaSeleccionado);
        const params: { [k: string]: any } = {};
        if (this.fisioterapeutaSeleccionado) {
            params['idEmpleado'] = {
                idPersona: this.fisioterapeutaSeleccionado,
            };
        }
        if (this.fecha) {
            params['fechaCadena'] = this.formatearFecha(
                moment(this.fecha).toDate()
            );
        }
        this.servicioExcepciones.getExcepciones(params).subscribe(
            (entity) => (this.excepciones = entity.lista),
            (error) => console.log(error)
        );
    }

    abrirFormulario() {
        this.modalService.open(NuevaExcepcionComponent, {
            size: 'lg',
            scrollable: true,
        });
    }
}
