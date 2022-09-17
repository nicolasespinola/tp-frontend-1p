import { Component, OnInit } from '@angular/core';
import {FichaClinica} from "../model/fichaClinica";
import {ServicefichaclinicaService} from "../service/servicefichaclinica.service";
import {Persona} from "../model/persona";
import {FormControl} from "@angular/forms";
import {Categoria} from "../model/categoria";
import {tipoProducto} from "../model/tipoProducto";
import {ServicecategoriaService} from "../service/servicecategoria.service";
import {ServicetipoProductoService} from "../service/servicestipoProducto.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AgregarFichaFormularioComponent} from "./agregar-ficha-formulario/agregar-ficha-formulario.component";
import {ModificarFichaFormularioComponent} from "./modificar-ficha-formulario/modificar-ficha-formulario.component";
import {AgregarServicioFormComponent} from "../servicios/agregar-servicio-form/agregar-servicio-form.component";

@Component({
  selector: 'app-fichas-clinicas',
  templateUrl: './fichas-clinicas.component.html',
  styleUrls: ['./fichas-clinicas.component.css']
})
export class FichasClinicasComponent implements OnInit {
  // Datos
  fichas: FichaClinica[] = []
  empleados: Persona[] = []
  clientes: Persona[] = []
  categorias: Categoria[] = []
  subcategorias: tipoProducto[] = []

  // Filtros
  filtroFechaDesde = new FormControl('');
  filtroFechaHasta = new FormControl('');
  filtroEmpleado = new FormControl('');
  filtroCliente = new FormControl('');
  filtroCategoria = new FormControl('');
  filtroSubcategoria = new FormControl('');


  constructor(private servicioFichasClinicas: ServicefichaclinicaService,
              private servicioCategoria: ServicecategoriaService,
              private servicioTipoProducto: ServicetipoProductoService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    // Adquirir fichas
    this.servicioFichasClinicas.getFichas().subscribe(
      entity => this.fichas = entity.lista,
      error => { console.log("No se pudieron obtener las fichas :c" + error); }
    );

    // Adquirir Empleados
    this.servicioFichasClinicas.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error => console.error(error)
    );

    // Adquirir Clientes
    this.servicioFichasClinicas.getPacientes().subscribe(
      entity => this.clientes = entity.lista,
      error => console.error(error)
    );

    // Adquirir categorías
    this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista,
      error => console.error(error)
    );
  }

  filtrar(): void {
    let ejemplo = new FichaClinica()

    // Agregar Rango de fechas
    // TODO: Validar rango
    if (this.filtroFechaDesde.value !== "" && this.filtroFechaHasta.value !== "") {
      // Formatear correctamente
      let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
      ejemplo.fechaDesdeCadena = this.filtroFechaDesde.value.replace(regex, '$1$2$3');
      ejemplo.fechaHastaCadena = this.filtroFechaHasta.value.replace(regex, '$1$2$3');

    }

    // Filtrar Empleado
    if (this.filtroEmpleado.value !== "") {
      ejemplo.idEmpleado = new Persona();
      ejemplo.idEmpleado.idPersona = parseInt(this.filtroEmpleado.value);
    }

    // Filtrar Cliente
    if (this.filtroCliente.value !== "") {
      ejemplo.idCliente = new Persona();
      ejemplo.idCliente.idPersona = parseInt(this.filtroCliente.value);
    }

    // Filtrar Subcategoría
    if (this.filtroSubcategoria.value !== "") {
      ejemplo.idTipoProducto = new tipoProducto();
      ejemplo.idTipoProducto.idTipoProducto = parseInt(this.filtroSubcategoria.value);
    }

    // Filtrar
    this.servicioFichasClinicas.getEjemploFicha(ejemplo).subscribe(
      entity => this.fichas = entity.lista,
      error => console.error(error)
    );
  }

  filtrarSubcategorias(): void {
    // TODO: Cambiar por su GET filtrado y ver que no explote xdxd
    if (this.filtroCategoria.value === '') return;

    this.servicioTipoProducto.gettipoProductos().subscribe(
      entity =>  {
        this.subcategorias = entity.lista
          .filter( tipo => tipo.idCategoria.idCategoria == parseInt(this.filtroCategoria.value))

        this.filtroSubcategoria.setValue('');
      }
    )
  }

  limpiarFiltro(): void {
    // Asignamos todas las fichas clinicas
    this.servicioFichasClinicas.getFichas().subscribe(
      entity => this.fichas = entity.lista,
      error => console.error(error)
    );

    // Limpiamos los filtros
    this.filtroEmpleado.setValue('');
    this.filtroCliente.setValue('');
    this.filtroFechaDesde.setValue('');
    this.filtroFechaHasta.setValue('');
    this.filtroCategoria.setValue('');
    this.filtroSubcategoria.setValue('');
  }

  abrirFormularioAgregarFicha(): void { // Abre el modal de agregar ficha
    this.modalService.open(AgregarFichaFormularioComponent, {
        size: 'lg',
        scrollable: true
    });
  }

  abrirFormularioModificarFicha(ficha: FichaClinica): void {
    const modalRef = this.modalService.open(ModificarFichaFormularioComponent, {
        size: 'lg',
        scrollable: true
    });
    modalRef.componentInstance.fichaOrigen = ficha;
  }

  // Abre el modal cuando se hace click en crear servicio
  abrirFormularioAgregarServicio(ficha: FichaClinica): void {
      const modalRef = this.modalService.open(AgregarServicioFormComponent, {
          size: 'lg',
          scrollable: true
      });
      modalRef.componentInstance.ficha = ficha;
  }
}
