import { Component, OnInit } from '@angular/core';
import { ServicecategoriaService } from '../../service/servicecategoria.service';
import { Categoria } from '../../model/categoria';
import { ServicetipoProductoService } from '../../service/servicestipoProducto.service';
import { tipoProducto } from '../../model/tipoProducto';
import { FichaClinica } from '../../model/fichaClinica';
import { ServicefichaclinicaService } from '../../service/servicefichaclinica.service';
import { Persona } from '../../model/persona';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-agregar-ficha-formulario',
    templateUrl: './agregar-ficha-formulario.component.html',
    styleUrls: ['./agregar-ficha-formulario.component.css'],
})
export class AgregarFichaFormularioComponent implements OnInit {
    // Datos para el formuario
    categorias: Categoria[] = [];
    tipoProductos: tipoProducto[] = [];
    pacientes: Persona[] = [];
    empleados: Persona[] = [];

    empleado!: Persona;
    cliente!: Persona;

    // Variables auxiliares
    tipoProductosFiltrado: tipoProducto[] = [];

    fichaClinica: FichaClinica = new FichaClinica();

    constructor(
        private servicioCategoria: ServicecategoriaService,
        private servicioTipoProducto: ServicetipoProductoService,
        private servicioFichaClinica: ServicefichaclinicaService,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        this.fichaClinica.idEmpleado = new Persona();
        this.fichaClinica.idCliente = new Persona();
        this.fichaClinica.idTipoProducto = new tipoProducto();
        this.fichaClinica.idTipoProducto.idCategoria = new Categoria();
        if (this.empleado && this.cliente) {
            this.fichaClinica.idEmpleado.idPersona = this.empleado.idPersona;
            this.fichaClinica.idCliente.idPersona = this.cliente.idPersona;
        }
        this.servicioCategoria.getCategorias().subscribe(
            (entity) => (this.categorias = entity.lista),
            (error) =>
                console.log('No se pudo obtener las categorías: ' + error)
        );

        this.servicioTipoProducto.gettipoProductos().subscribe(
            (entity) => (this.tipoProductos = entity.lista),
            (error) =>
                console.log(
                    'No se pudo obtener los tipos de producto: ' + error
                )
        );

        this.servicioFichaClinica.getPacientes().subscribe(
            (entity) => (this.pacientes = entity.lista),
            (error) => console.error(error)
        );

        this.servicioFichaClinica.getEmpleados().subscribe(
            (entity) => (this.empleados = entity.lista),
            (error) => console.error(error)
        );
    }

    agregar(): void {
        console.log('Se va a agregar');
        console.log(this.fichaClinica);
        this.servicioFichaClinica
            .agregarFichaClinica(this.fichaClinica)
            .subscribe(
                (next) => {
                    console.log(next);
                    this.activeModal.close('Se agregó con exito');
                },
                (error) => {
                    console.error(error);
                    this.activeModal.close('Hubo un error');
                }
            );
    }

    filtrarTipoProducto(): void {
        console.log('Se cambió la categoría');
        // TODO: Cambiar por un get filtrado
        this.tipoProductosFiltrado = this.tipoProductos.filter(
            (tipo) =>
                tipo.idCategoria.idCategoria ==
                this.fichaClinica.idTipoProducto.idCategoria.idCategoria
        );
    }
}
