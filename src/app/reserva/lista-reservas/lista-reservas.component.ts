import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarFichaFormularioComponent } from 'src/app/fichas-clinicas/agregar-ficha-formulario/agregar-ficha-formulario.component';
import { Persona } from 'src/app/model/persona';
import { Reserva } from 'src/app/model/reserva';
import { ServicereservaService } from 'src/app/service/servicereserva.service';

@Component({
    selector: 'app-lista-reservas',
    templateUrl: './lista-reservas.component.html',
    styleUrls: ['./lista-reservas.component.css'],
})
export class ListaReservasComponent implements OnInit {
    @Input() reservas!: Reserva[];
    observacion = '';
    asistio = false;
    reserva!: Reserva;

    constructor(
        private servicioReservas: ServicereservaService,
        private router: Router,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {}

    eliminarReserva(reserva: Reserva) {
        this.servicioReservas.deleteReserva(reserva.idReserva).subscribe(
            (data) => this.router.navigate(['reservas']),
            (error) => console.log('No se puedo eliminar la reserva')
        );
    }

    open(content: any) {
        this.modalService.open(content);
    }

    close() {
        this.modalService.dismissAll();
    }

    seleccionarReserva(reserva: Reserva) {
        this.reserva = reserva;
    }

    modificarReserva() {
        const params: { [k: string]: any } = {};
        params['idReserva'] = this.reserva.idReserva;
        params['observacion'] = this.observacion;
        params['flagAsistio'] = this.asistio ? 'S' : 'N';
        this.servicioReservas.putReserva(params).subscribe(
            (entity) => this.close(),
            (err) => console.log('Error al modificar la reserva')
        );
    }
    abrirFormularioAgregarFicha(empleado: Persona, cliente: Persona): void {
        const modalRef = this.modalService.open(
            AgregarFichaFormularioComponent,
            {
                size: 'lg',
                scrollable: true,
            }
        );
        modalRef.componentInstance.empleado = empleado;
        modalRef.componentInstance.cliente = cliente;
    }
}
