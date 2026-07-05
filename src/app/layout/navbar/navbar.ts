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
  esModoOscuro: boolean = true;

  usuarioAutenticado: boolean = true;
  // Simulamos un usuario autenticado con datos de ejemplo
  usuarioActual = {
    nombre: 'Lucas',
    fotoPerfil: 'https://i.pinimg.com/736x/07/28/53/0728531bc75369fc193cfbc272d16df3.jpg',
    rol: 'admin' // Puede ser 'usuario', 'critico' o 'admin'
  };

  constructor(public router: Router) {}

  ngOnInit() {  
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.body.style.backgroundColor = '';
  }

  ModoOscuro() {
    this.esModoOscuro = !this.esModoOscuro;
    const tema = this.esModoOscuro ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', tema);
  }
}