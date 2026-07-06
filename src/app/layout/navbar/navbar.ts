// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, Router } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   standalone: true, 
//   imports: [RouterLink, RouterLinkActive, CommonModule],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.css',
// })
// export class Navbar {
//   esModoOscuro: boolean = true; // Variable para controlar el modo oscuro

//   // Inyectamos el Router de Angular acá para poder usarlo en el HTML
//   constructor(public router: Router) {}

//   ngOnInit() {  
//     document.documentElement.setAttribute('data-bs-theme', 'dark');

//     // Anulamos el fondo estático que le habíamos puesto al index.html 
//     // para dejar que Bootstrap maneje los colores de fondo automáticamente
//     document.body.style.backgroundColor = '';
//   }

//   ModoOscuro() {
//     this.esModoOscuro = !this.esModoOscuro;
    
//     // Le decimos a Bootstrap que cambie toda la paleta de colores de la página
//     const tema = this.esModoOscuro ? 'dark' : 'light';
//     document.documentElement.setAttribute('data-bs-theme', tema);
//   }
// }
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

  // NUEVA FUNCIÓN: Devuelve true si el token existe (el usuario inició sesión)
  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  // NUEVA FUNCIÓN: Borra el token y redirige al home al cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
  // NUEVA FUNCIÓN: Abre el token JWT y saca el nombre del usuario
  obtenerNombreUsuario(): string {
    const token = localStorage.getItem('token');
    if (!token) return 'Jugador';

    try {
      // Un JWT tiene 3 partes separadas por puntos. La del medio (índice 1) tiene los datos.
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);
      
      // ATENCIÓN ACÁ: Cambiá 'username' o 'nombre' según cómo se llame el campo 
      // en el objeto que genera tu backend al loguearse.
      return payload.username || payload.nombre || 'Jugador';

    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return 'Jugador';
    }
  }
}