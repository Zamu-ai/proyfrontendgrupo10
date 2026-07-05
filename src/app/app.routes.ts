import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { JuegoDetalle } from './pages/juego-detalle/juego-detalle';
import { RegistroComponent } from './pages/registro/registro';
import { OuathCallback } from './pages/ouath-callback/ouath-callback';
import { PagoExitosoComponent } from './pages/pago-exitoso/pago-exitoso';


export const routes: Routes = [
  { path: '', component: HomeComponent }, // Mi home
  { path: 'Login', component: LoginComponent },
  {path:'oauth-callback',component: OuathCallback},
  {path: 'Registro', component: RegistroComponent},
  { path: 'JuegoDetalle', component: JuegoDetalle }, 
  { path: 'Registro', component: RegistroComponent },
  { path: '**', redirectTo: '' },
  {path: 'pago-exitoso', component: PagoExitosoComponent}
];