import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExistenciaProducto, PresentacionProducto, Producto } from '../model/presentacionProducto';
import { tipoProducto } from '../model/tipoProducto';
import { ServicepresentacionService } from '../service/servicepresentacion.service';
import { ServicetipoProductoService } from '../service/servicestipoProducto.service';

@Component({
  selector: 'app-presentacion-producto',
  templateUrl: './presentacion-producto.component.html',
  styleUrls: ['./presentacion-producto.component.css']
})
export class PresentacionProductoComponent implements OnInit {

  page = 1
  pageSize = 5

  presentaciones : PresentacionProducto [] = []
  tipos : tipoProducto [] = []
  productos : Producto [] = []

  idPresentacionProducto : string = ''
  p = new PresentacionProducto()
  selectProducto = new Producto()
  exProducto = new ExistenciaProducto()

  input = this.formBuilder.group(
    {
      texto: '',
      idTipoProducto: 0,
    },
    { updateOn: 'submit' }
  );

  presentacionInput = this.formBuilder.group(
    {
      nombre: '',
      codigo: '',
      flagServicio: 'S',
      idProducto: new Producto(),
      existenciaProducto: '',
    },
    { updateOn: 'submit' }
  );

  presentacionEditar = this.formBuilder.group(
    {
      idPresentacionProducto: 0,
      nombre: '',
      codigo: '',
      idProducto: new Producto(),
      existenciaProducto: '',
    },
    { updateOn: 'submit' }
  );

  constructor(private servicioPresentacion: ServicepresentacionService,
              private serviciotipoProductos: ServicetipoProductoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    const parametros: { [k: string]: any } = {};
    parametros['nombre'] = 's'
    console.log(parametros)
    console.log(JSON.stringify(parametros))
    this.servicioPresentacion.getPresentacionParams(parametros, 'S').subscribe(
      entity => this.presentaciones = entity.lista,
      error =>console.log('no se pudieron conseguir las presentaciones')
    );
    this.servicioPresentacion.getProductos().subscribe(
      entity => this.productos = entity.lista,
      error =>console.log('no se pudieron conseguir los productos')
    )
    this.serviciotipoProductos.getTipoProductos().subscribe(
      entity => this.tipos = entity.lista,
      error => { console.log("No se pudieron obtener los tipos de productos: " + error); }
    );
  }

  onSubmit(): void {
    const parametros: { [k: string]: any } = {};
    if (this.input.value.texto.normalize() !== "") {
      parametros['nombre'] = this.input.value.texto
    }
    if (this.input.value.idTipoProducto != 0) {
      parametros['idProducto'] = {
          idTipoProducto: {idTipoProducto: parseInt(this.input.value.idTipoProducto)},
      };
    }

    console.log(parametros)
    console.log(JSON.stringify(parametros))

    this.servicioPresentacion.getPresentacionParams(parametros, 'S').subscribe(
      entity => this.presentaciones = entity.lista,
      error =>console.log('no se pudieron conseguir las presentaciones')
     );
  }

  open(content: any) {
    this.modalService.open(content)  
  }

  openWithParams(content: any, presentacion: any){
    this.selectProducto = new Producto()
    this.exProducto = new ExistenciaProducto()
    this.p = presentacion
    this.idPresentacionProducto = this.p.idPresentacionProducto.toString()
    this.selectProducto = this.p.idProducto
    this.exProducto = this.p.existenciaProducto
    this.modalService.open(content)
  }

  close(content: any){
    this.modalService.dismissAll(content)
  }

  cargarPresentacion(): void{
    this.selectProducto.idProducto = this.presentacionInput.value.idProducto
    this.presentacionInput.value.idProducto = this.selectProducto
    this.exProducto.precioVenta = this.presentacionInput.value.existenciaProducto
    this.presentacionInput.value.existenciaProducto = this.exProducto
    console.log(this.presentacionInput.value)
    this.servicioPresentacion.postPresentacion(this.presentacionInput.value).subscribe(
      () => {
        
      },
      error => console.log("error: "+error))
  }

  actualizarPresentacion(): void{
    console.log(this.presentacionEditar.value)
    if(this.presentacionEditar.value.nombre.normalize() === "") {this.presentacionEditar.value.nombre = this.p.nombre}
    if(this.presentacionEditar.value.codigo.normalize() === "") {this.presentacionEditar.value.codigo = this.p.codigo}
    if(this.presentacionEditar.value.idProducto){
      console.log('entro en if')
      this.presentacionEditar.value.idProducto = this.selectProducto
    }else{
      console.log('entro en else')
      this.selectProducto = new Producto()
      this.selectProducto.idProducto = parseInt(this.presentacionInput.value.idProducto)
      this.presentacionInput.value.idProducto = this.selectProducto
    }
    if(this.presentacionEditar.value.existenciaProducto.normalize() === ""){
      this.presentacionEditar.value.existenciaProducto = this.exProducto
    }else{
      this.exProducto.precioVenta = parseInt(this.presentacionInput.value.existenciaProducto)
      this.presentacionInput.value.existenciaProducto = this.exProducto
    }
    this.servicioPresentacion.updatePresentacion(this.presentacionEditar.value, this.idPresentacionProducto).subscribe(
      () => {
        location.reload()
      },
      error => console.log("error: "+error))
  }

  borrarPresentacion(): void{
    this.servicioPresentacion.deletePresentacioni(this.presentacionEditar.value, this.idPresentacionProducto).subscribe(
      () => {
        location.reload()
      },
      error => console.log("error: "+error))
  }

}
