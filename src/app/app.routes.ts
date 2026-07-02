import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/login/login';
import { JuegoDetalle } from './pages/juego-detalle/juego-detalle';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page route LUCAS
  { path: 'Login', component: Login }, 
  { path: 'JuegoDetalle', component: JuegoDetalle }, 
  { path: '**', redirectTo: '' } 
];