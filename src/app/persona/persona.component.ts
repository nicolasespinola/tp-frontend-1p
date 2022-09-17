import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from '../model/persona';
import { ServicepersonaService } from '../service/servicepersona.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  page = 1
  pageSize = 3
  personas: Persona[] = []
  p: Persona = new Persona()
  idPersona: string = ''
  campo = new FormControl('')
  fechaCompare = new Date("1990-01-01")
  input = this.formBuilder.group(
    {
      texto: '',
    },
    { updateOn: 'submit' }
  );

  personaInput = this.formBuilder.group(
    {
      nombre: '',
      apellido: '',
      email:'',
      telefono:'',
      cedula:'',
      ruc:'',
      tipoPersona:'',
      fechaNacimiento: new Date(),
    },
    { updateOn: 'submit' }
  );

  personaEditar = this.formBuilder.group(
    {
      idPersona: 0,
      nombre: '',
      apellido: '',
      email:'',
      telefono:'',
      cedula:'',
      ruc:'',
      tipoPersona:'',
      fechaNacimiento: new Date("1990-01-01"),
    },
    { updateOn: 'submit' }
  );

  constructor(private servicioPersona: ServicepersonaService,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    const params = new HttpParams()
      .set('orderBy', 'apellido')
      .set('orderDir', 'desc')
    this.servicioPersona.getPersonasParams(params).subscribe(
      entity => this.personas = entity.lista,
      error =>console.log('no se pudieron conseguir las personas')
     );
  }

  open(content: any) {
    this.modalService.open(content)  
  }

  openWithParams(content: any, persona: any){
    this.p = persona
    this.idPersona = this.p.idPersona.toString()
    this.personaEditar.value.fechaNacimiento = this.p.fechaNacimiento
    console.log(this.p.fechaNacimiento)
    console.log(this.personaEditar.value.fechaNacimiento)
    this.modalService.open(content)
  }

  close(content: any){
    this.modalService.dismissAll(content)
  }

  onSubmit(): void {
    const params = new HttpParams()
      .set('ejemplo', JSON.stringify({[this.campo.value]: this.input.value.texto}))
      .set('like', 'S')
      .set('orderBy', 'apellido')
      .set('orderDir', 'desc')
    this.servicioPersona.getPersonasParams(params).subscribe(
      entity => this.personas = entity.lista,
      error =>console.log('no se pudieron conseguir los personas')
     );
  }

  cargarPersona(): void{
    this.personaInput.value.fechaNacimiento = this.personaInput.value.fechaNacimiento + " 00:00:00"
    console.log(this.personaInput.value)
    this.servicioPersona.postPersona(this.personaInput.value).subscribe(
      () => {
        
      },
      error => console.log("error: "+error))
   }

   actualizarPersona(): void{
    if(this.personaEditar.value.nombre.normalize() === "") {this.personaEditar.value.nombre = this.p.nombre}
    if(this.personaEditar.value.apellido.normalize() === "") {this.personaEditar.value.apellido = this.p.apellido}
    if(this.personaEditar.value.email.normalize() === "") {this.personaEditar.value.email = this.p.email}
    if(this.personaEditar.value.cedula.normalize() === "") {this.personaEditar.value.cedula = this.p.cedula}
    if(this.personaEditar.value.ruc.normalize() === "") {this.personaEditar.value.ruc = this.p.ruc}
    if(this.personaEditar.value.telefono.normalize() === "") {this.personaEditar.value.telefono = this.p.telefono}
    if(this.personaEditar.value.tipoPersona.normalize() === "") {this.personaEditar.value.tipoPersona = this.p.tipoPersona}
    if(this.personaEditar.value.fechaNacimiento.getTime() === this.fechaCompare.getTime()) {
      this.personaEditar.value.fechaNacimiento = this.p.fechaNacimiento + " 00:00:00"
    }else{
      this.personaEditar.value.fechaNacimiento = this.personaEditar.value.fechaNacimiento + " 00:00:00"
    }
    this.servicioPersona.updatePersona(this.personaEditar.value, this.idPersona).subscribe(
      () => {
        
      },
      error => console.log("error: "+error))
  }

  borrarPersona(): void{
    this.servicioPersona.deletePersona(this.personaEditar.value, this.idPersona).subscribe(
      () => {
        
      },
      error => console.log("error: "+error))
  }


}
