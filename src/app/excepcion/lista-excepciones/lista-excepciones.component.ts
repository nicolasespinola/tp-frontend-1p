import { Component, Input, OnInit } from '@angular/core';
import { horarioExcepcion } from 'src/app/model/horarioExcepcion';

@Component({
    selector: 'app-lista-excepciones',
    templateUrl: './lista-excepciones.component.html',
    styleUrls: ['./lista-excepciones.component.css'],
})
export class ListaExcepcionesComponent implements OnInit {
    @Input() excepciones!: horarioExcepcion[];
    constructor() {}

    ngOnInit(): void {}
}
