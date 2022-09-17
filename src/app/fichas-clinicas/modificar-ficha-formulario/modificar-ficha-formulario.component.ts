import {Component, Input, OnInit} from '@angular/core';
import {FichaClinica} from "../../model/fichaClinica";
import {tipoProducto} from "../../model/tipoProducto";
import {ServicefichaclinicaService} from "../../service/servicefichaclinica.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Servicio from "../../model/servicio";
import {ServiciosService} from "../../service/servicios.service";
import {ModificarServicioFormComponent} from "../../servicios/modificar-servicio-form/modificar-servicio-form.component";

@Component({
    selector: 'app-modificar-ficha-formulario',
    templateUrl: './modificar-ficha-formulario.component.html',
    styleUrls: ['./modificar-ficha-formulario.component.css']
})
export class ModificarFichaFormularioComponent implements OnInit {
    // Datos
    servicios: Servicio[] = [];

    // Inputs
    @Input() fichaOrigen!: FichaClinica

    // Variables auxiliares
    tipoProductosFiltrado: tipoProducto[] = []
    fichaClinica: FichaClinica = new FichaClinica();

    constructor(private servicioFichaClinica: ServicefichaclinicaService,
                public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private servicioService: ServiciosService) {
    }

    ngOnInit(): void {
        // Copiar de forma nero a la variable de este componente para evitar efectos secundarios
        // No se si al usar se bugea, pero no me quiero arriesgar
        this.fichaClinica.idFichaClinica = this.fichaOrigen.idFichaClinica;
        this.fichaClinica.observacion = this.fichaOrigen.observacion ?? "";

        let ejemplo = new Servicio();
        ejemplo.idFichaClinica = new FichaClinica();
        ejemplo.idFichaClinica.idFichaClinica = this.fichaOrigen.idFichaClinica;

        this.servicioService.getServicioEjemplo(ejemplo).subscribe(
            next => this.servicios = next.lista,
            error => console.error(error)
        );
    }

    modificar(): void {
        console.log("Se va a modificar");
        this.servicioFichaClinica.modificarFichaClinica(this.fichaClinica).subscribe(
            entity => {
                console.log("Se modificó: " + entity);
                this.activeModal.close("Se modificó la ficha clinica");
            },
            error => {
                console.error(error);
                this.activeModal.close("Hubo un error");
            }
        );
    }

    modificarServicio(servicio: Servicio) {
        const modalRef = this.modalService.open(ModificarServicioFormComponent, {
            size: 'lg',
            scrollable: true
        });
        modalRef.componentInstance.servicio = servicio;
    }
}
