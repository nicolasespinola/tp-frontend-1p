import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FichaClinica} from "../../model/fichaClinica";

@Component({
  selector: 'app-tabla-fichas',
  templateUrl: './tabla-fichas.component.html',
  styleUrls: ['./tabla-fichas.component.css']
})
export class TablaFichasComponent implements OnInit {

  @Input() fichas!: FichaClinica[]
  @Output() onModificarFicha = new EventEmitter<FichaClinica>();
  @Output() onCrearServicio = new EventEmitter<FichaClinica>();
  constructor() { }

  ngOnInit(): void {
  }

  modificarFicha(ficha: FichaClinica): void {
    // Emitir un evento diciendo que quiere modificar esa ficha
    this.onModificarFicha.emit(ficha);
  }

}
