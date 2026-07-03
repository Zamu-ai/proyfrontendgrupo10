import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosService } from '../../services/juegos.service'; // Ajustado al nombre correcto del servicio
import { Subject } from 'rxjs'; // Importamos Subject para el buscador
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  juegosDestacados: any[] = [];
  catalogoGeneral: any[] = [];

  // --- VARIABLES PARA EL BUSCADOR DESPLEGABLE ---
  // Guardamos las sugerencias acá para no sobreescribir el catálogo general
  sugerenciasBusqueda: any[] = [];
  // Controla si se muestra o se oculta el menú flotante
  mostrarSugerencias: boolean = false;

  // NUEVO: Creamos un "Subject" (un canal de comunicación) para el buscador
  private buscadorSubject = new Subject<string>();

  constructor(private juegosService: JuegosService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCatalogoGeneral();
    this.cargarJuegosDestacados();

    // NUEVO: Configuramos el "Debounce" (freno) apenas arranca la página
    this.buscadorSubject.pipe(
      // Espera 200 milisegundos después de que el usuario deja de tipear
      debounceTime(200), 
      // Solo manda la petición si el texto realmente cambió (ej: si escribe y borra rápido, no busca)
      distinctUntilChanged() 
    ).subscribe(termino => {
      // Cuando pasen los 200ms, recién ahí ejecutamos la búsqueda real
      this.ejecutarBusquedaReal(termino);
    });
  }

  cargarCatalogoGeneral() {
    // Pegamos el endpoint de "más jugados" para mostrarlo en el Home
    this.juegosService.obtenerMasJugados().subscribe({
      // sino ponemos any no funciona
      next: (datosQueLlegan: any) => {
        // Nos aseguramos de agarrar .data si viene empaquetado, o el arreglo directo
        this.catalogoGeneral = datosQueLlegan.data || datosQueLlegan || [];
        
        // Mostramos al instante
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar el catálogo:', error);
      }
    });
  }

  cargarJuegosDestacados() {
    // Consumimos el get general de juegos.
    this.juegosService.obtenerTodosLosJuegos().subscribe({
      next: (datosQueLlegan: any) => {
        // Agarramos el array que manda el backend
        let historialJuegos = datosQueLlegan.data || datosQueLlegan || [];

        // 1. Damos vuelta el array con reverse() para que los más nuevos queden al principio
        // 2. Cortamos el array con slice(0, 5) para quedarnos solo con los últimos 5
        this.juegosDestacados = historialJuegos.reverse().slice(0, 5);

        // Forzamos la detección de cambios para que el HTML se dibuje al instante
        // Esto soluciona el bug de tener que apretar Ctrl+S en Visual Studio para ver las imágenes
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar destacados:', error);
      }
    });
  }

  // --- FUNCIÓN PARA BUSCAR SUGERENCIAS ---
  // El HTML llama a esta función, pero esta NO va al backend, solo avisa al Subject
  buscarSugerencias(termino: string) {
    if (!termino.trim()) {
      // Si está vacío, limpiamos la pantalla rápido sin esperar
      this.sugerenciasBusqueda = [];
      this.mostrarSugerencias = false;
      this.cdr.detectChanges();
    } else {
      // Le pasamos el texto al Subject para que empiece a contar los 200ms
      this.buscadorSubject.next(termino);
    }
  }

  // --- FUNCION DE TIEMPO ---
  // Pasados los 200ms, esta funcion va al backend y trae las sugerencias reales
  ejecutarBusquedaReal(termino: string) {
    // Pegamos a la ruta de sugerencias del backend
    this.juegosService.obtenerSugerencias(termino).subscribe({
      next: (datosQueLlegan: any) => {
        // Guardamos los resultados ÚNICAMENTE en el array de sugerencias (no tocamos el catálogo de abajo)
        this.sugerenciasBusqueda = datosQueLlegan.data || datosQueLlegan || [];

        // Cortamos el array para guardar ÚNICAMENTE un máximo de 5 sugerencias asi no se hace más largo
        this.sugerenciasBusqueda = this.sugerenciasBusqueda.slice(0, 5);
        
        // Mostramos el menú desplegable
        this.mostrarSugerencias = true;
        
        // Con esto angular dibuja al instante el menú flotante con las sugerencias
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al buscar sugerencias:', error);
      }
    });
  }

  // --- FUNCIÓN PARA CUANDO HACEN CLIC EN UNA SUGERENCIA DEL DESPLEGABLE ---
  seleccionarSugerencia(juego: any) {
    // Poner la redirección a la pagina de detalle
    console.log('El usuario eligió:', juego.titulo);
    
    // Cerramos el menu desplegable y limpiamos las sugerencias
    this.mostrarSugerencias = false;
    this.sugerenciasBusqueda = [];
  }
}