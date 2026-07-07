import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private url_dashboard='http://localhost:3000/api/dashboard';
  constructor(private apiDashboard:HttpClient){}

  //pa obtener token
   private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // pa crear headers con el token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getMetricas():Observable<any>{
    return this.apiDashboard.get(`${this.url_dashboard}/metricas`)
  }
  getLoginsPorDia():Observable<any>{
    return this.apiDashboard.get(`${this.url_dashboard}/logins-por-dia`)
  }
  getAccionesPorTipo():Observable<any>{
    return this.apiDashboard.get(`${this.apiDashboard}/acciones-por-tipo`)
  }
  getUsuariosActivos():Observable<any>{
    return this.apiDashboard.get(`${this.apiDashboard}/usuarios-activos`)
  }
  getAuditoria(pagina:number, limite:number, busqueda:string):Observable<any>{
    return this.apiDashboard.get(`${this.apiDashboard}/auditoria?pagina=${pagina}$limite=${limite}&busqueda=${busqueda}`)
  }
  getJuegosBuscados():Observable<any>{
    return this.apiDashboard.get(`${this.url_dashboard}/juegos-buscados`)
  }



}
