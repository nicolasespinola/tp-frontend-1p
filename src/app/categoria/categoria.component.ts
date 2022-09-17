import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { ServicecategoriaService } from '../service/servicecategoria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = []
  idCategoria: string = ''
  campo = new FormControl('')
  page: number = 0
  pageSize: number = 10
  input = this.FormBuilder.group(
    {
      texto: '',
    },
    { updateOn: 'submit' }
  );

  categoriaInput = this.FormBuilder.group(
    {
      idCategoria: 0,
      descripcion: '',
    },
    { updateOn: 'submit' }
  );

  constructor(private servicioCategorias: ServicecategoriaService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
  ) { }


  ngOnInit(): void {
    const params = new HttpParams()
    .set("orderBy", "idCategoria")
    .set("orderDir", "asc")
    this.servicioCategorias.getCategoriasParams(params).subscribe(
      entity => this.categorias = entity.lista, 
      error => { console.log("No se pudieron obtener las categorias: " + error); },
    )
  }

  open(content: any) {
    this.modalService.open(content)  
  }

  openWithParams(content: any, idCategoria: any){
    this.idCategoria = idCategoria
    this.modalService.open(content)
  }

  close(content: any){
    this.modalService.dismissAll(content)
  }

  onSubmit(): void {
    const params = new HttpParams()
      .set('ejemplo', JSON.stringify({[this.campo.value]: this.input.value.texto}))
      .set('like', 'S')
    this.servicioCategorias.getCategoriasParams(params).subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudieron conseguir las categorias')
     );
  }

  cargarCategoria(): void{
    this.servicioCategorias.agregarCategoria(this.categoriaInput.value).subscribe(
      () => {
      location.reload()
      },
      error => console.log("error: "+error))
  }

  actualizarCategoria(): void{
    this.servicioCategorias.updateCategoria(this.categoriaInput.value, this.idCategoria).subscribe(
      () => {
      location.reload()
      },
      error => console.log("error: "+error))
  }

  borrarCategoria(): void{
    this.servicioCategorias.borrarCategoria(this.categoriaInput.value, this.idCategoria).subscribe(
      () => {
        location.reload()
      },
      error => console.log("error: "+error))
  }

}
