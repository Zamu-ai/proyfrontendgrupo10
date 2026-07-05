import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-exitoso.html',
  styleUrls: ['./pago-exitoso.css']
})
export class PagoExitosoComponent implements OnInit {

  // Variables para guardar lo que nos devuelve Mercado Pago
  paymentId: string | null = null;
  status: string | null = null;
  preferenceId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // 🕵️‍♂️ Capturamos los datos que viajan en la barra de direcciones
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'];
      this.status = params['status'];
      this.preferenceId = params['preference_id'];

      console.log("Datos recuperados de Mercado Pago:");
      console.log("ID de Pago:", this.paymentId);
      console.log("Estado del Pago:", this.status);
      console.log("ID de Preferencia:", this.preferenceId);

      // Si el estado es aprobado ('approved'), le avisamos al usuario
      if (this.status === 'approved') {
        Swal.fire({
          title: '¡Pago Confirmado!',
          text: 'Tu pase de acceso anticipado ha sido activado con éxito.',
          icon: 'success',
          confirmButtonColor: '#0dcaf0'
        });
        
        // 🐘 ACÁ MÁS ADELANTE SE HARÁ LA LLAMADA AL BACKEND PARA POSTGRESQL
        // Este es el puente perfecto para guardar la info.
      }
    });
  }

  volverAlHome() {
    this.router.navigate(['/home']);
  }
}