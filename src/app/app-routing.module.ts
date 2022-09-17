import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuardGuard } from './login-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichasClinicasComponent } from './fichas-clinicas/fichas-clinicas.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { tipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { ReservaComponent } from './reserva/reserva.component';
import { NuevaReservaComponent } from './reserva/nueva-reserva/nueva-reserva.component';
import { PersonaComponent } from './persona/persona.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ExcepcionComponent } from './excepcion/excepcion.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PresentacionProductoComponent } from './presentacion-producto/presentacion-producto.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteDetalladoComponent } from './reporte-detallado/reporte-detallado.component';

const routes: Routes = [
    {
        path: 'persona',
        component: PersonaComponent,
    },
    {
        path: 'fichas',
        component: FichasClinicasComponent,
    },
    { path: 'categoria', component: CategoriaComponent },
    {
        path: 'tipoProducto',
        component: tipoProductoComponent,
    },
    {
        path: 'reservas',

        children: [
            {
                path: '',
                component: ReservaComponent,
                pathMatch: 'full',
            },
            {
                path: 'nueva',
                component: NuevaReservaComponent,
            },
        ],
    },
    {
        path: 'configuracion',
        children: [
            { path: '', component: ConfiguracionComponent },
            { path: 'excepciones', component: ExcepcionComponent },
        ],
    },
    {
        path: 'servicios',
        component: ServiciosComponent,
    },
    {
        path: 'presentacion-producto',
        component: PresentacionProductoComponent,
    },
    { path: 'reporte', component: ReporteComponent },
    { path: 'detallado', component: ReporteDetalladoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
