import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para usar *ngFor y *ngIf en el HTML
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html', // Apuntamos al html
  styleUrls: ['./home.css']   // Apuntamos al css
})
export class HomeComponent implements OnInit {

  // Declaramos dos arrays para almacenar los juegos destacados y el catálogo general
  juegosDestacados: any[] = [];
  catalogoGeneral: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cargarJuegosMock();
  }

  // Método temporal para cargar datos de ejemplo (mock) en los arrays - CAMBIAR CUANDO ESTÉ DISPONIBLE LA BD PROPIA
  cargarJuegosMock() {
    // 1. CARRUSEL: Ponemos juegos con portadas anchas
    this.juegosDestacados = [
      {
        id: 730,
        titulo: 'Counter-Strike 2',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg',
        descuento: 'Free',
        precio: 'Gratis'
      },
      {
        id: 578080,
        titulo: 'PUBG: BATTLEGROUNDS',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_616x353.jpg',
        descuento: 'Free',
        precio: 'Gratis'
      }
    ];

    // 2. CATÁLOGO GENERAL: Simulamos que trajo juegos de la API
    this.catalogoGeneral = [
      {
        id: 374320,
        titulo: 'Dark Souls III',
        categoria: 'RPG / Acción',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/capsule_616x353.jpg',
        descuento: '-50%',
        precio: '$29.99 USD'
      },
      {
        id: 105600,
        titulo: 'Terraria',
        categoria: 'Supervivencia / Mundo Abierto',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/capsule_616x353.jpg',
        descuento: '-20%',
        precio: '$19.99 USD'
      },
      {
        id: 1151340,
        titulo: 'Fallout 76',
        categoria: 'RPG / Multijugador',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/capsule_616x353.jpg',
        descuento: '-75%',
        precio: '$5.99 USD'
      },
      {
        id: 550,
        titulo: 'Left 4 Dead 2',
        categoria: 'Zombies / Cooperativo',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/550/capsule_616x353.jpg',
        descuento: '-90%',
        precio: '$0.99 USD'
      },
      {
        id: 1091500,
        titulo: 'Cyberpunk 2077',
        categoria: 'RPG / Mundo Abierto',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg',
        descuento: '-50%',
        precio: '$29.99 USD'
      },
      {
        id: 367520,
        titulo: 'Hollow Knight',
        categoria: 'Metroidvania',
        imagen: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg',
        descuento: 'Free',
        precio: 'Incluido en GamePass'
      }
    ];
  }
}