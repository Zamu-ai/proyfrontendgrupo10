import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { JuegoService } from '../../services/juego.service';

interface JuegoDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  imagenPortada: string;
  plataformas: string[];
  generos: string[];
  trailerId: string;
  fechaLanzamiento: string;
  calificacion: number;
  desarrolladora: string;
  capturas: string[];
  juegosSimilares: { id: number; titulo: string; imagenPortada: string; }[];
  dlcs: any[];
  expansiones: any[];
  sagas: any[];
}

@Component({
  selector: 'app-juego-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './juego-detalle.html',
  styleUrls: ['./juego-detalle.css'],
  providers: [DatePipe]
})
export class JuegoDetalleComponent implements OnInit {
  
  juego: JuegoDetalle | null = null;
  trailerUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cargarDetalleJuego(id);
      }
    });
  }

  cargarDetalleJuego(id: string): void {
    this.juego = null;
    this.juegoService.getJuegoById(id).subscribe({
      next: (data: JuegoDetalle) => {
        this.juego = data;
        if (this.juego.trailerId) {
          const url = `https://www.youtube.com/embed/${this.juego.trailerId}`;
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      },
      error: (err) => {
        console.error('Error al cargar los detalles del juego:', err);
        this.router.navigate(['/home']);
      }
    });
  }

  getRatingClass(calificacion: number): string {
    if (calificacion >= 75) return 'bg-success';
    if (calificacion >= 50) return 'bg-warning text-dark';
    return 'bg-danger';
  }
}