import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ServiceloginService } from '../service/servicelogin.service';
import { Router } from '@angular/router';
import { Persona } from '../model/persona';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    usuarios: Persona[] = [];
    input = this.formBuilder.group(
        {
            username: ['', this.userValidator.bind(this)],
            password: '',
        },
        { updateOn: 'submit' }
    );
    usuario!: Persona;

    constructor(
        private servicioLogin: ServiceloginService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.servicioLogin.getUsuarios().subscribe(
            (entity) => (this.usuarios = entity.lista),
            (error) => console.log(error)
        );
    }

    onSubmit(): void {
        if (this.input.valid) {
            localStorage.setItem('usuario', JSON.stringify(this.usuario));
            this.router.navigate(['']);
        }
    }

    userValidator(control: AbstractControl): { [key: string]: any } | null {
        let usernames: string[] = [];
        this.usuarios.forEach((element: Persona) => {
            usernames.push(element.usuarioLogin);
            if (element.usuarioLogin === control.value) {
                this.usuario = element;
            }
        });
        if (!usernames.includes(control.value)) {
            return {
                usernameInvalid: 'No puede iniciar sesión con este usuario.',
            };
        }
        return null;
    }
}
