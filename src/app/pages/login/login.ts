import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 🔥 Importamos el enrutador para redirigir
import { AuthService } from '../../services/auth.service'; // 🔥 Importamos tu nuevo servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // Inyectamos el servicio de autenticación y el router de Angular
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credenciales = this.loginForm.value;

      // 🚀 Llamamos al servicio HTTP asíncrono
      this.authService.login(credenciales).subscribe({
        next: (response) => {
          console.log('¡Respuesta del servidor exitosa!', response);
          if (response.status === '1') {
            // Guardamos el token JWT en el almacenamiento del navegador
            localStorage.setItem('token', response.token);

            Swal.fire({
              title: '¡Bienvenido de nuevo!',
              text: 'Inicio de sesión exitoso. Preparando tu catálogo...',
              icon: 'success',
              background: '#1a1a1a', // Fondo oscuro gamer
              color: '#fff',
              confirmButtonColor: '#0dcaf0', // Botón cian
              timer: 2500,
              timerProgressBar: true
            }).then(() => {
              this.router.navigate(['/home']);
            });
          }
        },
        error: (err) => {
          console.error('Error al conectar:', err);
          alert('Error de autenticación: ' + (err.error?.msg || 'Servidor desconectado'));
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}