import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { JuegoDetalle } from './pages/juego-detalle/juego-detalle';
import { RegistroComponent } from './pages/registro/registro';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Mi home
  { path: 'Login', component: LoginComponent }, 
  { path: 'JuegoDetalle', component: JuegoDetalle }, 
  { path: 'Registro', component: RegistroComponent },
  { path: '**', redirectTo: '' } 
];