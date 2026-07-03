import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private apiUrl = 'http://localhost:3000/api/juegos';

  constructor(private http: HttpClient) { }

  getJuegoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalle/${id}`);
  }
}