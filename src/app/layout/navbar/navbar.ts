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
  esModoOscuro: boolean = true;

  // En lugar de ser un true fijo, ahora responde dinámicamente a si hay token o no
  get usuarioAutenticado(): boolean {
    return this.estaLogueado();
  }

  // Función mágica para obtener todos los datos del usuario logueado en tiempo real
  get usuarioActual() {
    const token = localStorage.getItem('token');
    if (!token) return { nombre: 'Jugador', fotoPerfil: 'assets/default-avatar.png', rol: 'usuario' };

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      const payload = JSON.parse(jsonPayload);
      
      // Mapeamos los datos reales que inyecta tu backend en el token
      return {
        nombre: payload.username || payload.nombre || 'Jugador',
        fotoPerfil: payload.foto || 'https://api.dicebear.com/7.x/bottts/svg?seed=default',
        rol: payload.perfil || payload.rol || 'usuario' // Evaluamos tu columna 'perfil' de Sequelize
      };
    } catch (error) {
      return { nombre: 'Jugador', fotoPerfil: 'https://api.dicebear.com/7.x/bottts/svg?seed=default', rol: 'usuario' };
    }
  }

  constructor(public router: Router) {}

  ngOnInit() {  
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }

  ModoOscuro() {
    this.esModoOscuro = !this.esModoOscuro;
    const tema = this.esModoOscuro ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', tema);
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  obtenerNombreUsuario(): string {
    return this.usuarioActual.nombre;
  }
}