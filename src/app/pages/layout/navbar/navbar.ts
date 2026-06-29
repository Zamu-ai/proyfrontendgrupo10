import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  esModoOscuro: boolean = true; // Variable para controlar el modo oscuro

  // Inyectamos el Router de Angular acá para poder usarlo en el HTML
  constructor(public router: Router) {}

  ngOnInit() {  
    document.documentElement.setAttribute('data-bs-theme', 'dark');

    // Anulamos el fondo estático que le habíamos puesto al index.html 
    // para dejar que Bootstrap maneje los colores de fondo automáticamente
    document.body.style.backgroundColor = '';
  }

  ModoOscuro() {
    this.esModoOscuro = !this.esModoOscuro;
    
    // Le decimos a Bootstrap que cambie toda la paleta de colores de la página
    const tema = this.esModoOscuro ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', tema);
  }
}