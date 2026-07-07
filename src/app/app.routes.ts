import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { JuegoDetalle } from './pages/juego-detalle/juego-detalle';
import { RegistroComponent } from './pages/registro/registro';
import { OuathCallback } from './pages/ouath-callback/ouath-callback';
import { PagoExitosoComponent } from './pages/pago-exitoso/pago-exitoso';


export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'Login', component: LoginComponent },
  { path: 'oauth-callback', component: OuathCallback },
  { path: 'Registro', component: RegistroComponent },
<<<<<<< HEAD
  {path: 'pago-exitoso', component: PagoExitosoComponent},
  { path: '**', redirectTo: '' }
  
=======
  
  // Soporte para la ruta de la tarjeta del catálogo de tu compañero
  { path: 'JuegoDetalle/:id', component: JuegoDetalle }, 
  
  // Soporte para la ruta del buscador de sugerencias de tu compañero
  { path: 'juego/:id', component: JuegoDetalle },

  { path: '**', redirectTo: '' } 
>>>>>>> main
];