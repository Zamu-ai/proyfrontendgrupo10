import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importamos Router para poder redirigir a la página de detalle
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

  constructor(private juegosService: JuegosService, private cdr: ChangeDetectorRef, private router: Router) { }

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
      // Cuando pasen los 200ms, recién se ejecuta la búsqueda real
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
    // Leemos la memoria
    let historialStr = localStorage.getItem('historialBuscados');
    let historial = historialStr ? JSON.parse(historialStr) : [];

    if (historial.length > 0) {
      // Si hay juegos guardados en el historial, mostramos esos
      this.juegosDestacados = historial;
      this.cdr.detectChanges();
    } else {
      // Si está vacío (primer ingreso), traemos los de la base de datos por defecto
      this.juegosService.obtenerTodosLosJuegos().subscribe({
        next: (datosQueLlegan: any) => {
          let historialJuegos = datosQueLlegan.data || datosQueLlegan || [];
          this.juegosDestacados = historialJuegos.reverse().slice(0, 5);
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.error('Error al cargar destacados:', error);
        }
      });
    }
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
    // Cerramos el menú
    this.mostrarSugerencias = false;
    this.sugerenciasBusqueda = [];
    this.guardarEnHistorialLocal(juego);
    
    // Pasamos a la pag de detalle con el ID
    // Asegurar si el backend devuelve el ID
    this.router.navigate(['/juego', juego.id]); 
    this.cargarJuegosDestacados();
  }

  // --- NUEVA FUNCIÓN: Guarda el juego en la memoria del navegador ---
  guardarEnHistorialLocal(juego: any) {
    // 1. Traemos lo que haya en memoria (si no hay nada, empezamos con un array vacío)
    let historialStr = localStorage.getItem('historialBuscados');
    let historial = historialStr ? JSON.parse(historialStr) : [];

    // 2. Filtramos el array para borrar el juego si ya estaba (así no se repite en el carrusel)
    historial = historial.filter((j: any) => j.id !== juego.id);

    // 3. Agregamos el juego clickeado al principio de la lista
    historial.unshift(juego);

    // 4. Si la lista tiene más de 5 juegos, lo cortamos
    if (historial.length > 5) {
      historial = historial.slice(0, 5);
    }

    // 5. Guardamos la lista actualizada en la memoria del navegador
    localStorage.setItem('historialBuscados', JSON.stringify(historial));
  }

  // --- NUEVA FUNCIÓN PARA LAS TARJETAS DEL CATÁLOGO ---
    verDetalle(id: number) {
    this.router.navigate(['/JuegoDetalle', id]);
  }

// --- NUEVA FUNCIÓN PARA LAS TARJETAS DEL CATÁLOGO ---

obtenerIconosPlataformas(plataformas: any[]): string[] {
    // Si viene vacío o nulo (juegos como Subway Surfers Blast), devolvemos un array vacío
    if (!plataformas || plataformas.length === 0) return [];
    
    // Usamos un Set para que no se repitan íconos (ej: si tiene PS4 y PS5, que salga un solo logo)
    const iconos = new Set<string>();

      plataformas.forEach((plat: any) => {
      const p = plat.toLowerCase();
      
      // Filtramos las 5 categorías principales
      if (p.includes('pc') || (p.includes('windows') && !p.includes('phone'))) iconos.add('bi-windows');
      if (p.includes('playstation')) iconos.add('bi-playstation');
      if (p.includes('xbox')) iconos.add('bi-xbox');
      if (p.includes('android')) iconos.add('bi-android2');
      if (p.includes('ios') || p.includes('mac')) iconos.add('bi-apple');
    });

    return Array.from(iconos);
  }
}