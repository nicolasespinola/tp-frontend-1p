import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Servicio from "../../model/servicio";

@Component({
    selector: 'app-listado-servicios',
    templateUrl: './listado-servicios.component.html',
    styleUrls: ['./listado-servicios.component.css']
})
export class ListadoServiciosComponent implements OnInit {

    @Input() servicios!: Servicio[]
    @Output() onVerServicio = new EventEmitter<Servicio>();
    @Output() onEditarServicio = new EventEmitter<Servicio>();
    constructor() {
    }

    ngOnInit(): void {
    }

}
