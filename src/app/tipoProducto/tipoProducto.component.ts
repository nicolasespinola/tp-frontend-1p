import { Component, OnInit } from '@angular/core';
import { tipoProducto } from '../model/tipoProducto';
import { Categoria } from '../model/categoria';
import { ServicetipoProductoService } from '../service/servicestipoProducto.service';
import { FormBuilder, FormControl } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tipoProducto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.css']
})
export class tipoProductoComponent implements OnInit {

  tipoProducto: tipoProducto[] = []
  categoria: Categoria[] = []
  selectCategoria: Categoria = new Categoria()
  idTipoProducto: string = ''
  campo = new FormControl('')
  page: number = 0
  pageSize: number = 10
  input = this.FormBuilder.group(
    {
      texto: '',
    },
    { updateOn: 'submit' }
  );

  tipoProductoInput = this.FormBuilder.group(
    {
      idCategoria: new Categoria(),
      descripcion: '',
    },
    { updateOn: 'submit' }
  );

  constructor(private serviciotipoProductos: ServicetipoProductoService,
      private FormBuilder: FormBuilder,
      private router: Router,
      private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    const params = new HttpParams()
    .set("orderBy", "idTipoProducto")
    .set("orderDir", "asc")
    this.serviciotipoProductos.getTipoProductosParams(params).subscribe(
      entity => this.tipoProducto = entity.lista,
      error => { console.log("No se pudieron obtener los tipos de productos: " + error); }
    );
    this.serviciotipoProductos.getCategorias().subscribe(
      entity => this.categoria = entity.lista,
      error => { console.log("No se pudieron obtener las categorias: " + error); }
    )
  }

  open(content: any) {
    this.modalService.open(content)  
  }

  openWithParams(content: any, idTipoProducto: any){
    this.idTipoProducto = idTipoProducto
    this.modalService.open(content)
  }

  close(content: any){
    this.modalService.dismissAll(content)
  }

  onSubmit(): void {
    const params = new HttpParams()
      .set('ejemplo', JSON.stringify({[this.campo.value]: this.input.value.texto}))
      .set('like', 'S')
    this.serviciotipoProductos.getTipoProductosParams(params).subscribe(
      entity => this.tipoProducto = entity.lista,
      error =>console.log('No se pudieron conseguir los tipos de productos')
     );
  }

  cargarTipoProducto(): void{
    this.selectCategoria.idCategoria = this.tipoProductoInput.value.idCategoria
    this.tipoProductoInput.value.idCategoria = this.selectCategoria
    this.serviciotipoProductos.agregarTipoProducto(this.tipoProductoInput.value).subscribe(
      () => {
        location.reload()
      },
      error => console.log("error: "+error))
  }

  actualizarTipoProducto(): void{
    this.selectCategoria.idCategoria = this.tipoProductoInput.value.idCategoria
    this.tipoProductoInput.value.idCategoria = this.selectCategoria
    this.serviciotipoProductos.updateTipoProducto(this.tipoProductoInput.value, this.idTipoProducto).subscribe(
      () => {
        location.reload()
      },
      error => console.log("error: "+error))
  }

  borrarTipoProducto(): void{
    this.serviciotipoProductos.borrarTipoProducto(this.tipoProductoInput.value, this.idTipoProducto).subscribe(
      () => {
        location.reload()
      },
      error => console.log("error: "+error))
  }

}
