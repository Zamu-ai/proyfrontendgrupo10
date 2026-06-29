import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  esModoOscuro: boolean = false;

  ModoOscuro() {
    this.esModoOscuro = !this.esModoOscuro;
  
    if (this.esModoOscuro)
      alert("MODO OSCURO ACTIVAO");
    else
      alert("MODO OSCURO DESACTIVADO");
  }
}