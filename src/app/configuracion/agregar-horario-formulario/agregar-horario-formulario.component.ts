import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DiaAgenda, HorarioAgenda} from "../../model/horarioAgenda";
import {HorarioAgendaService} from "../../service/horario-agenda.service";
import {Persona} from "../../model/persona";

@Component({
  selector: 'app-agregar-horario-formulario',
  templateUrl: './agregar-horario-formulario.component.html',
  styleUrls: ['./agregar-horario-formulario.component.css']
})
export class AgregarHorarioFormularioComponent implements OnInit {
  horarioAgenda: HorarioAgenda = new HorarioAgenda();
  fisioterapeutas: Persona[] = [];
  dias: DiaAgenda[] = [0, 1, 2, 3, 4, 5, 6];

  constructor(public activeModal: NgbActiveModal,
              private serviceHorarios: HorarioAgendaService) {
  }

  ngOnInit(): void {
    this.horarioAgenda = {
      dia: DiaAgenda.LUNES,
      horaAperturaCadena: "0900",
      horaCierreCadena: "1100",
      intervaloMinutos: 15,
      idEmpleado: new Persona()
    };

    // Obtener fisioterapeutas
    this.serviceHorarios.getEmpleados().subscribe(
      next => this.fisioterapeutas = next.lista,
      error => console.error(error)
    );
  }

  cambiarHoraInicio(evento: Event): void {
    let regex = /([0-9][0-9]):([0-9][0-9])/;
    this.horarioAgenda.horaAperturaCadena = (evento.target! as HTMLInputElement).value.replace(regex, "$1$2");
  }

  cambiarHoraCierre(evento: Event): void {
    let regex = /([0-9][0-9]):([0-9][0-9])/;
    this.horarioAgenda.horaCierreCadena = (evento.target! as HTMLInputElement).value.replace(regex, "$1$2");
  }

  agregar(): void {
    console.log("Se va a agregar");
    this.serviceHorarios.agregarHorario(this.horarioAgenda).subscribe(
      next => {
        console.log(next);
        this.activeModal.close("Se agregó con exito");
      },
      error => {
        console.error(error);
        this.activeModal.close("Hubo un error");
      }
    );
  }

}
