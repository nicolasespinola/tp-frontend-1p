import { Component, OnInit } from '@angular/core';
import {HorarioAgenda} from "../model/horarioAgenda";
import {HorarioAgendaService} from "../service/horario-agenda.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AgregarHorarioFormularioComponent} from "./agregar-horario-formulario/agregar-horario-formulario.component";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  // Datos
  horarios: HorarioAgenda[] = [];

  constructor(private horarioService: HorarioAgendaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    // Obtener los horarios
    this.horarioService.getHorarios().subscribe(
      next => this.horarios = next.lista,
      error => console.error(error)
    );
  }

  filtrar(ejemplo: HorarioAgenda) {
    this.horarioService.getEjemploHorarios(ejemplo).subscribe(
      next => this.horarios = next.lista,
      error => console.error(error)
    );
  }

  abrirFormularioAgregar() {
    this.modalService.open(AgregarHorarioFormularioComponent, {
      size: 'lg',
      scrollable: true,
    });
  }
}
