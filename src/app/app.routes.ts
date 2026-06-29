import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; // Pag principal home

export const routes: Routes = [
  { path: '', component: HomeComponent }, // La ruta vacía (el inicio) carga el Home
  { path: '**', redirectTo: '' } // Si alguien escribe una URL que no existe, lo manda al Home
];