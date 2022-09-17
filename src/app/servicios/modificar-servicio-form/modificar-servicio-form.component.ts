import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Servicio from "../../model/servicio";
import {Categoria} from "../../model/categoria";
import {tipoProducto} from "../../model/tipoProducto";
import {ServicecategoriaService} from "../../service/servicecategoria.service";
import {ServicetipoProductoService} from "../../service/servicestipoProducto.service";
import {HttpParams} from "@angular/common/http";
import {ServiciosService} from "../../service/servicios.service";
import ServicioDetalle, {ExistenciaProducto, PresentacionProducto, Producto} from "../../model/servicioDetalle";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-modificar-servicio-form',
    templateUrl: './modificar-servicio-form.component.html',
    styleUrls: ['./modificar-servicio-form.component.css']
})
export class ModificarServicioFormComponent implements OnInit {
    servicio!: Servicio;
    detallesServicio: ServicioDetalle[] = [];
    categorias: Categoria[] = [];
    subcategorias: tipoProducto[] = [];
    presentaciones: PresentacionProducto[] = [];
    existenciaProducto: ExistenciaProducto = {precioVenta: 0, cantidad: 0};

    // Form
    presentacion: PresentacionProducto = new PresentacionProducto();
    cantidad = new FormControl(0);

    constructor(public activeModal: NgbActiveModal,
                private categoriaServicio: ServicecategoriaService,
                private subcategoriaServicio: ServicetipoProductoService,
                private servicioService: ServiciosService) {
    }

    ngOnInit(): void {
        // Obtener las categorias
        this.categoriaServicio.getCategorias().subscribe(
            next => this.categorias = next.lista,
            error => console.error(error)
        );

        // Obtener los detalles de este servicio
        this.servicioService.getDetallesDeServicio(this.servicio.idServicio).subscribe(
            next => this.detallesServicio = next,
            error => console.error(error)
        );
    }

    onSeleccionarCategoria(event: Event): void {
        // vaciar Subs y presentaciones
        this.subcategorias = [];
        this.presentaciones = [];

        // Crear Filtro
        let ejemplo = new tipoProducto();
        ejemplo.idCategoria = new Categoria();
        ejemplo.idCategoria.idCategoria = parseInt((event.target! as HTMLSelectElement).value);

        let params = new HttpParams();
        params = params.append("ejemplo", JSON.stringify(ejemplo));

        // Filtrar subcategorias
        this.subcategoriaServicio.getTipoProductosParams(params).subscribe(
            next => this.subcategorias = next.lista,
            error => console.error(error)
        );
    }

    onSeleccionarSubcategoria(event: Event): void {
        // Vaciar presentaciones
        this.presentaciones = [];

        // Crear Filtro
        let ejemplo = new PresentacionProducto();
        ejemplo.idProducto = new Producto();
        ejemplo.idProducto.idTipoProducto = new tipoProducto();
        ejemplo.idProducto.idTipoProducto.idTipoProducto = parseInt((event.target! as HTMLSelectElement).value);

        // FIltrar Presentaciones de Producto
        this.servicioService.getPresentacionesProducto(ejemplo).subscribe(
            next => this.presentaciones = next.lista,
            error => console.error(error)
        );
    }

    onSeleccionarPresentacionProducto(event: Event): void {
        // Crear Filtro
        let idPresentacion = parseInt((event.target! as HTMLSelectElement).value);
        let ejemplo = new PresentacionProducto();
        ejemplo.idPresentacionProducto = idPresentacion;

        // Obtener la presentación producto
        this.servicioService.getPresentacionesProducto(ejemplo).subscribe(
            next => this.presentacion = next.lista[0],
            error => console.error(error)
        );

        // Obtener el precio (Se puede estirar de la presentación pero tiene su api)
        this.servicioService.getExistenciaProducto(idPresentacion).subscribe(
            next => this.existenciaProducto = next.lista[0],
            error => console.error(error)
        );
    }

    agregarDetalle(): void {
        // Armamos el body
        let ejemplo = new ServicioDetalle();
        ejemplo.cantidad = this.cantidad.value;
        ejemplo.idPresentacionProducto = new PresentacionProducto();
        ejemplo.idPresentacionProducto.idPresentacionProducto = this.presentacion.idPresentacionProducto;
        ejemplo.idServicio = new Servicio();
        ejemplo.idServicio.idServicio = this.servicio.idServicio;

        // Agregamos el detalle
        this.servicioService.crearDetalleServicio(ejemplo).subscribe(
            next => {
                console.log(next);
                this.refrescarListaDetalles();
            },
            error => console.error(error)
        );
    }

    eliminarDetalle(idDetalle: number): void {
        this.servicioService.eliminarDetalleServicio(this.servicio.idServicio, idDetalle).subscribe(
          next => {
              console.log(next);
              this.refrescarListaDetalles();
          },
          error => console.error(error)
        );
    }

    refrescarListaDetalles() {
        // Refrescar lista
        this.servicioService.getDetallesDeServicio(this.servicio.idServicio).subscribe(
            next => this.detallesServicio = next,
            error => console.error(error)
        )
    }
}
