import { Component, OnInit } from '@angular/core';
import Servicio from '../model/servicio';
import ServicioDetalle from '../model/servicioDetalle';
import { ServicereporteService } from '../service/servicereporte.service';
import { FormBuilder } from '@angular/forms';
import { Persona } from '../model/persona';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {

  servicios: Servicio[] = [];
  detalle: ServicioDetalle[] = [];
  empleados: Persona[] = [];
  pacientes: Persona[] = [];
  idServicio: Servicio = new Servicio();
  fechas = this.formBuilder.group({ desde: '', hasta: '' });
  empleadoSeleccionado: Persona | undefined;
  pacienteSeleccionado: Persona | undefined;
  buscadorPersona = this.formBuilder.group({ nombre: '' });
  fileName= 'Reporte-Detallado.xlsx';

  constructor(private reporteService: ServicereporteService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal){ 
  }

  ngOnInit(): void {
    
    this.reporteService.getPacientes({}, 'N').subscribe(
      (entity) =>
          entity.lista.forEach((persona) =>
              !persona.usuarioLogin ? this.pacientes.push(persona) : null
          ),
      (error) => console.log(error)
    );

    this.reporteService.getEmpleados({}, 'N').subscribe(
        (entity) => (this.empleados = entity.lista),
        (error) => console.log(error)
    );

  }

  open(content: any) {
    this.modalService.open(content);
  }

  close() {
      this.modalService.dismissAll();
  }

  buscarEmpleado() {
    const params: { [k: string]: any } = {};
    params['nombre'] = this.buscadorPersona.value.nombre;
    this.reporteService.getEmpleados(params, 'S').subscribe(
        (entity) => (this.empleados = entity.lista),
        (error) => console.log(error)
    );
  }

  buscarPaciente() {
      const params: { [k: string]: any } = {};
      params['nombre'] = this.buscadorPersona.value.nombre;
      this.reporteService.getPacientes(params, 'S').subscribe(
          (entity) => (this.pacientes = entity.lista),
          (error) => console.log(error)
      );
  }

  seleccionarEmpleado(persona: Persona) {
      this.empleadoSeleccionado = persona;
      this.close();
  }

  seleccionarCliente(persona: Persona) {
      this.pacienteSeleccionado = persona;
      this.close();
  }

  limpiar() {
      this.servicios = [];
      this.detalle = [];
      this.pacienteSeleccionado = undefined;
      this.empleadoSeleccionado = undefined;
      this.fechas.value.desde = undefined;
      this.fechas.value.hasta = undefined;
  }

  formatearFecha(date: Date) {
    const string_date = `${date.getFullYear()}${(
        '0' +
        (date.getMonth() + 1)
    ).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

  return string_date;
  }

  filtrar() {
    const params: { [k: string]: any } = {};
    params['idServicio'] = 'idFichaClinica';
    if (this.pacienteSeleccionado) {
        params['idServicio']['idEmpleado'] = {
            idFichaClinica: {
              idCliente: {
                idPersona: this.pacienteSeleccionado.idPersona,
        }}};
    }
    if (this.empleadoSeleccionado) {
        params['idServicio'] = {
            idEmpleado: this.empleadoSeleccionado.idPersona,
        };
    }
    if (this.fechas.value.desde) {
        params['idServicio'] = { fechaDesdeCadena: this.formatearFecha(
            moment(this.fechas.value.desde).toDate()
        )
      }
    }
    if (this.fechas.value.hasta) {
        params['idServicio'] = { fechaHastaCadena: this.formatearFecha(
            moment(this.fechas.value.hasta).toDate()
        )
      }
    }
    if(this.fechas.value.desde && this.fechas.value.hasta){
      this.reporteService.getDetallesParams(params).subscribe(
        (entity) => (this.detalle = entity.lista),
        (error) => console.log(error)
      );
    }
  }

  exportexcel(): void 
  {
    let element = document.getElementById('reporte'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  exportpdf(): void
  {
    let columns = [["Fecha","ID Servicio", "Profesional", "Cliente", "Precio Unitario", "Cantidad", "Total", "Presentacion"]];
    let data = [];
    for(const s of this.detalle){
      data.push([s.idServicio.fechaHora, s.idServicio.idServicio, s.idServicio.idFichaClinica.idEmpleado.nombreCompleto, 
      s.idServicio.idFichaClinica.idCliente.nombreCompleto, s.idPresentacionProducto.existenciaProducto.precioVenta, 
      s.cantidad, s.cantidad * s.idPresentacionProducto.existenciaProducto.precioVenta, s.idPresentacionProducto.nombre
      ])
    }
    
  const doc = new jsPDF(); // or let doc = new jsPDF.default();
  autoTable(doc, {
      head: columns,
      body: data,
      didDrawPage: (dataArg) => { 
      }
  }); 
    doc.save("Reporte-Detallado");
  }
}
