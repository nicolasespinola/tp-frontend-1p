import {Component, OnInit} from '@angular/core';
import {ServiciosService} from "../service/servicios.service";
import Servicio from "../model/servicio";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModificarServicioFormComponent} from "./modificar-servicio-form/modificar-servicio-form.component";
import {AgregarServicioFormComponent} from "./agregar-servicio-form/agregar-servicio-form.component";

@Component({
    selector: 'app-servicios',
    templateUrl: './servicios.component.html',
    styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
    servicios: Servicio[] = [];

    constructor(private servicioService: ServiciosService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.servicioService.getServicios().subscribe(
            next => this.servicios = next.lista,
            error => console.error(error)
        );
    }

    verServicio(servicio: Servicio): void {
        const modalRef = this.modalService.open(ModificarServicioFormComponent, {
            size: 'lg',
            scrollable: true
        });
        modalRef.componentInstance.servicio = servicio;
    }

    filtrarServicios(ejemplo: Servicio) {
        this.servicioService.getServicioEjemplo(ejemplo).subscribe(
            next => this.servicios = next.lista,
            error => console.error(error)
        );
    }

    crearServicio() {
        this.modalService.open(AgregarServicioFormComponent, {
            size: 'lg',
            scrollable: true
        });
    }

}
