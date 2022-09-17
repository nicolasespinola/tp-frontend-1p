import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/model/persona';
import { Reserva } from 'src/app/model/reserva';
import { ServicereservaService } from 'src/app/service/servicereserva.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
    selector: 'app-nueva-reserva',
    templateUrl: './nueva-reserva.component.html',
    styleUrls: ['./nueva-reserva.component.css'],
})
export class NuevaReservaComponent implements OnInit {
    reservas: Reserva[] = [];
    empleados: Persona[] = [];
    pacientes: Persona[] = [];
    empleadoSeleccionado: Persona;
    pacienteSeleccionado: Persona | undefined;
    buscadorPersona = this.formBuilder.group({ nombre: '' });
    filtros = this.formBuilder.group({
        fecha: moment().format('DD/MM/YYYY'),
        ocupados: false,
    });
    observacion = '';
    horarioSeleccionado!: Reserva;

    constructor(
        private servicioReservas: ServicereservaService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        this.empleadoSeleccionado = usuario;
    }

    ngOnInit(): void {
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

        let params = new HttpParams();
        params = params.set('fecha', this.formatearFecha(new Date()));
        params = params.set('disponible', 'S');
        this.servicioReservas
            .getAgenda(this.empleadoSeleccionado.idPersona, params)
            .subscribe(
                (entity) => (this.reservas = entity),
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

    buscarEmpleado() {
        const params: { [k: string]: any } = {};
        params['nombre'] = this.buscadorPersona.value.nombre;
        this.servicioReservas.getEmpleados(params, 'S').subscribe(
            (entity) => (this.empleados = entity.lista),
            (error) => console.log(error)
        );
    }

    buscarPaciente() {
        const params: { [k: string]: any } = {};
        params['nombre'] = this.buscadorPersona.value.nombre;
        this.servicioReservas.getPacientes(params, 'S').subscribe(
            (entity) => (this.pacientes = entity.lista),
            (error) => console.log(error)
        );
    }

    open(content: any) {
        this.modalService.open(content);
    }

    close() {
        this.modalService.dismissAll();
    }

    seleccionarEmpleado(persona: Persona) {
        this.empleadoSeleccionado = persona;
        this.close();
    }

    seleccionarCliente(persona: Persona) {
        this.pacienteSeleccionado = persona;
        this.close();
    }

    onSubmit() {
        let params = new HttpParams();
        params = params.set(
            'fecha',
            this.formatearFecha(moment(this.filtros.value.fecha).toDate())
        );
        !this.filtros.value.ocupados
            ? (params = params.set('disponible', 'S'))
            : null;
        this.servicioReservas
            .getAgenda(this.empleadoSeleccionado.idPersona, params)
            .subscribe(
                (entity) => (this.reservas = entity),
                (error) => console.log(error)
            );
    }

    seleccionarHorario(reserva: Reserva) {
        this.horarioSeleccionado = reserva;
    }

    postReserva() {
        const params: { [k: string]: any } = {};
        params['fechaCadena'] = this.horarioSeleccionado.fechaCadena;
        params['horaInicioCadena'] = this.horarioSeleccionado.horaInicioCadena;
        params['horaFinCadena'] = this.horarioSeleccionado.horaFinCadena;
        params['idEmpleado'] = {
            idPersona: this.empleadoSeleccionado.idPersona,
        };
        params['idCliente'] = {
            idPersona: this.pacienteSeleccionado?.idPersona,
        };
        if (this.observacion !== '') {
            params['observacion'] = this.observacion;
        }
        this.servicioReservas.postReserva(params).subscribe(
            () => {
                this.close();
                this.router.navigate(['reservas']);
            },
            (error) => console.log('error: ' + error)
        );
    }
}
