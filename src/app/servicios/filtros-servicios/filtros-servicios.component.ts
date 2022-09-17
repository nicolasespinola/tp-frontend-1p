import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Servicio from "../../model/servicio";
import {FichaClinica} from "../../model/fichaClinica";
import {Persona} from "../../model/persona";
import {ServicefichaclinicaService} from "../../service/servicefichaclinica.service";
import {ServicecategoriaService} from "../../service/servicecategoria.service";
import {ServicetipoProductoService} from "../../service/servicestipoProducto.service";
import {Categoria} from "../../model/categoria";
import {tipoProducto} from "../../model/tipoProducto";

@Component({
    selector: 'app-filtros-servicios',
    templateUrl: './filtros-servicios.component.html',
    styleUrls: ['./filtros-servicios.component.css']
})
export class FiltrosServiciosComponent implements OnInit {
    // Datos
    empleados: Persona[] = [];
    clientes: Persona[] = [];
    categorias: Categoria[] = [];
    subcategorias: tipoProducto[] = [];

    // Filtro
    ejemplo = new Servicio();

    // Eventos
    @Output() onFiltrarServicios = new EventEmitter<Servicio>();
    @Output() onCrearServicio = new EventEmitter<any>();
    constructor(private servicioFicha: ServicefichaclinicaService,
                private servicioCategoria: ServicecategoriaService,
                private servicioSubcategoria: ServicetipoProductoService) {
    }

    ngOnInit(): void {
        // Inicializamos el filtro
        this.resetEjemplo();

        // Inicializamos los empleados y clientes
        this.servicioFicha.getEmpleados().subscribe(
            next => this.empleados = next.lista,
            error => console.error(error)
        );

        this.servicioFicha.getPacientes().subscribe(
            next => this.clientes = next.lista,
            error => console.error(error)
        );

        // Inicializamos las categorias y subcategorias
        this.servicioCategoria.getCategorias().subscribe(
            next => this.categorias = next.lista,
            error => console.error(error)
        );

        this.servicioSubcategoria.gettipoProductos().subscribe(
            next => this.subcategorias = next.lista,
            error => console.error(error)
        );
    }

    resetEjemplo() {
        this.ejemplo = new Servicio();
        this.ejemplo.idFichaClinica = new FichaClinica();
        this.ejemplo.idFichaClinica.idCliente = new Persona();
        this.ejemplo.idFichaClinica.idTipoProducto = new tipoProducto();
        this.ejemplo.idFichaClinica.idTipoProducto.idCategoria = new Categoria();
        this.ejemplo.idEmpleado = new Persona();
    }

    limpiarFiltros() {
        this.resetEjemplo();
        this.ejecutarFiltro();
    }

    ejecutarFiltro() {
        // Limpiar fechas
        let ejemploLimpio: Servicio = JSON.parse(JSON.stringify(this.ejemplo));
        let regex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;

        if (ejemploLimpio.fechaDesdeCadena !== "" && ejemploLimpio.fechaDesdeCadena !== undefined)
            ejemploLimpio.fechaDesdeCadena = ejemploLimpio.fechaDesdeCadena.replace(regex, "$1$2$3");

        if (ejemploLimpio.fechaHastaCadena !== "" && ejemploLimpio.fechaHastaCadena !== undefined)
            ejemploLimpio.fechaHastaCadena = ejemploLimpio.fechaHastaCadena.replace(regex, "$1$2$3");

        this.onFiltrarServicios.emit(ejemploLimpio);
    }
}
