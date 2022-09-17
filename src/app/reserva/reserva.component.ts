import { Component, OnInit } from '@angular/core';
import { Reserva } from '../model/reserva';
import { ServicereservaService } from '../service/servicereserva.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../model/persona';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
    reservas: Reserva[] = [];
    empleados: Persona[] = [];
    pacientes: Persona[] = [];
    empleadoSeleccionado: number | undefined;
    pacienteSeleccionado: number | undefined;
    fechaDesde!: string;
    fechaHasta!: string;

    constructor(
        private servicioReservas: ServicereservaService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.servicioReservas.getReservasHoy().subscribe(
            (entity) => (this.reservas = entity.lista),
            (error) => console.log(error)
        );

        this.servicioReservas.getPacientes({}, 'N').subscribe(
            (entity) =>
                entity.lista.forEach((persona) =>
                    !persona.usuarioLogin ? this.pacientes.push(persona) : null
                ),
            (error) => console.log(error)
        );

        this.servicioReservas.getEmpleados({}, 'N').subscribe(
            (entity) => (this.empleados = entity.lista),
            (error) => console.log(error)
        );
    }

    open(content: any) {
        this.modalService.open(content);
    }

    close() {
        this.modalService.dismissAll();
    }

    limpiar() {
        this.servicioReservas.getReservasHoy().subscribe(
            (entity) => (this.reservas = entity.lista),
            (error) => console.log(error)
        );
        this.pacienteSeleccionado = undefined;
        this.empleadoSeleccionado = undefined;
        this.fechaDesde = '';
        this.fechaHasta = '';
    }

    formatearFecha(date: Date) {
        const string_date = `${date.getFullYear()}${(
            '0' +
            (date.getMonth() + 1)
        ).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

        return string_date;
    }

    filtrar() {
        const params: { [k: string]: any } = {};
        if (this.empleadoSeleccionado) {
            console.log('JPSDSDS');
            params['idEmpleado'] = {
                idPersona: this.empleadoSeleccionado,
            };
        }
        if (this.pacienteSeleccionado) {
            params['idCliente'] = {
                idPersona: this.pacienteSeleccionado,
            };
        }
        if (this.fechaDesde !== '') {
            params['fechaDesdeCadena'] = this.formatearFecha(
                moment(this.fechaDesde).toDate()
            );
        }
        if (this.fechaHasta) {
            params['fechaHastaCadena'] = this.formatearFecha(
                moment(this.fechaHasta).toDate()
            );
        }
        this.servicioReservas.getReservas(params).subscribe(
            (entity) => (this.reservas = entity.lista),
            (error) => console.log(error)
        );
    }
}
