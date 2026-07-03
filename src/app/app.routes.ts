import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { JuegoDetalleComponent } from './pages/juego-detalle/juego-detalle';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Mi home
  { path: 'Login', component: LoginComponent },
  {path: 'Registro', component: RegistroComponent},
  { path: 'juego/detalle/:id', component: JuegoDetalleComponent },
  { path: '**', redirectTo: '' } 
];