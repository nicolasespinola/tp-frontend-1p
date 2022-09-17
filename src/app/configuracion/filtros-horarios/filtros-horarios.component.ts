import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DiaAgenda, HorarioAgenda} from "../../model/horarioAgenda";
import {Persona} from "../../model/persona";
import {HorarioAgendaService} from "../../service/horario-agenda.service";

@Component({
  selector: 'app-filtros-horarios',
  templateUrl: './filtros-horarios.component.html',
  styleUrls: ['./filtros-horarios.component.css']
})
export class FiltrosHorariosComponent implements OnInit {
  horarioFiltro: HorarioAgenda = new HorarioAgenda();
  dias: DiaAgenda[] = [0, 1, 2, 3, 4, 5, 6];
  fisioterapeutas: Persona[] = [];

  @Output() onFiltrar = new EventEmitter<HorarioAgenda>();
  constructor(private agendaService: HorarioAgendaService) { }

  ngOnInit(): void {
    // Inicializamos
    this.horarioFiltro.idEmpleado = new Persona();

    this.agendaService.getEmpleados().subscribe(
      next => this.fisioterapeutas = next.lista,
      error => console.error(error)
    );
  }

  clickFiltrar(): void {
    this.onFiltrar.emit(this.horarioFiltro);
  }

  clickLimpiar(): void {
    this.horarioFiltro = new HorarioAgenda();
    this.horarioFiltro.idEmpleado = new Persona();
    this.clickFiltrar();
  }
}
