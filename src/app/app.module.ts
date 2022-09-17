import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ServiceloginService } from './service/servicelogin.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichasClinicasComponent } from './fichas-clinicas/fichas-clinicas.component';
import { ServicefichaclinicaService } from './service/servicefichaclinica.service';
import { TablaFichasComponent } from './fichas-clinicas/tabla-fichas/tabla-fichas.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { tipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { ServicecategoriaService } from './service/servicecategoria.service';
import { ServicetipoProductoService } from './service/servicestipoProducto.service';
import { ReservaComponent } from './reserva/reserva.component';
import { ListaReservasComponent } from './reserva/lista-reservas/lista-reservas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NuevaReservaComponent } from './reserva/nueva-reserva/nueva-reserva.component';
import { AgregarFichaFormularioComponent } from './fichas-clinicas/agregar-ficha-formulario/agregar-ficha-formulario.component';
import { ModificarFichaFormularioComponent } from './fichas-clinicas/modificar-ficha-formulario/modificar-ficha-formulario.component';
import { PersonaComponent } from './persona/persona.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { TablaHorariosComponent } from './configuracion/tabla-horarios/tabla-horarios.component';
import { GetHoraFormateadaPipe } from './configuracion/tabla-horarios/get-hora-formateada.pipe';
import { GetDiaFormateadoPipe } from './configuracion/tabla-horarios/get-dia-formateado.pipe';
import { FiltrosHorariosComponent } from './configuracion/filtros-horarios/filtros-horarios.component';
import { AgregarHorarioFormularioComponent } from './configuracion/agregar-horario-formulario/agregar-horario-formulario.component';
import { ExcepcionComponent } from './excepcion/excepcion.component';
import { ListaExcepcionesComponent } from './excepcion/lista-excepciones/lista-excepciones.component';
import { NuevaExcepcionComponent } from './excepcion/nueva-excepcion/nueva-excepcion.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FiltrosServiciosComponent } from './servicios/filtros-servicios/filtros-servicios.component';
import { ListadoServiciosComponent } from './servicios/listado-servicios/listado-servicios.component';
import { ModificarServicioFormComponent } from './servicios/modificar-servicio-form/modificar-servicio-form.component';
import { GetFechaFromServicioPipe } from './pipes/get-fecha-from-servicio.pipe';
import { AgregarServicioFormComponent } from './servicios/agregar-servicio-form/agregar-servicio-form.component';
import { PresentacionProductoComponent } from './presentacion-producto/presentacion-producto.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteDetalladoComponent } from './reporte-detallado/reporte-detallado.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        CategoriaComponent,
        tipoProductoComponent,
        FichasClinicasComponent,
        TablaFichasComponent,
        ReservaComponent,
        ListaReservasComponent,
        NuevaReservaComponent,
        AgregarFichaFormularioComponent,
        ModificarFichaFormularioComponent,
        PersonaComponent,
        ConfiguracionComponent,
        TablaHorariosComponent,
        GetHoraFormateadaPipe,
        GetDiaFormateadoPipe,
        FiltrosHorariosComponent,
        AgregarHorarioFormularioComponent,
        ExcepcionComponent,
        ListaExcepcionesComponent,
        NuevaExcepcionComponent,
        ServiciosComponent,
        FiltrosServiciosComponent,
        ListadoServiciosComponent,
        ModificarServicioFormComponent,
        GetFechaFromServicioPipe,
        AgregarServicioFormComponent,
        PresentacionProductoComponent,
        ReporteComponent,
        ReporteDetalladoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
    ],
    providers: [
        ServiceloginService,
        ServicecategoriaService,
        ServicetipoProductoService,
        ServicefichaclinicaService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
