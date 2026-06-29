 import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { JuegoDetalle } from './pages/juego-detalle/juego-detalle';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'Login',component:Login},
    {path:'JuegoDetalle',component:JuegoDetalle}
];
