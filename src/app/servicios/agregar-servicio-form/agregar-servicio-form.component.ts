import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FichaClinica} from "../../model/fichaClinica";
import {FormControl} from "@angular/forms";
import {ServiciosService} from "../../service/servicios.service";
import Servicio from "../../model/servicio";
import {ServicefichaclinicaService} from "../../service/servicefichaclinica.service";

@Component({
    selector: 'app-agregar-servicio-form',
    templateUrl: './agregar-servicio-form.component.html',
    styleUrls: ['./agregar-servicio-form.component.css']
})
export class AgregarServicioFormComponent implements OnInit {
    ficha!: FichaClinica;
    fichas: FichaClinica[] = [];
    fichaServicio?: FichaClinica;

    // FORM CONTROL
    observacion = new FormControl("");


    constructor(public activeModal: NgbActiveModal,
                private servicioService: ServiciosService,
                private fichaService: ServicefichaclinicaService) {
    }

    ngOnInit(): void {
        this.fichaService.getFichas().subscribe(
            next => this.fichas = next.lista,
            error => console.error(error)
        );
    }

    crearServicio() {
        // Crear cuerpo
        let servicio = new Servicio();
        servicio.idFichaClinica = new FichaClinica();
        servicio.idFichaClinica.idFichaClinica = (this.fichaServicio ?? this.ficha).idFichaClinica;
        servicio.observacion = this.observacion.value;

        // crear servicio
        this.servicioService.crearServicio(servicio).subscribe(
            next => {
                console.log("Agregado: " + next);
                this.activeModal.close("Se agregó el servicio");
            },
            error => console.error(error)
        )
    }

    setearFicha(ficha: FichaClinica) {
        this.fichaServicio = ficha;
    }
}
