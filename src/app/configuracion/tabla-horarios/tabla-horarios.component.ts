import {Component, Input, OnInit} from '@angular/core';
import {HorarioAgenda} from "../../model/horarioAgenda";

@Component({
  selector: 'app-tabla-horarios',
  templateUrl: './tabla-horarios.component.html',
  styleUrls: ['./tabla-horarios.component.css']
})
export class TablaHorariosComponent implements OnInit {

  @Input() horarios!: HorarioAgenda[]
  constructor() { }

  ngOnInit(): void {
  }

}
