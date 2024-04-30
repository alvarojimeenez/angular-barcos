import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socio } from '../interfaces/Socio';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private baseURL = "http://localhost:8082"
  constructor(private http: HttpClient) { }

  private socioId!: number

  getSocios(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.baseURL}/socios`)
  }

  getSociosById(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.baseURL}/socio/${id}`)
  }

  postSocio(socio: Omit<Socio, "idSocio">) {
    return this.http.post<Socio>(`${this.baseURL}/socio`, socio)
  }

  putSocio(socio: Omit<Socio, "idSocio">, id: number) {
    return this.http.put<Socio>(`${this.baseURL}/socio/${id}`, socio)
  }

  deleteSocio(id:number) {
    return this.http.delete<Socio>(`${this.baseURL}/socio/${id}`)
  }

  getSociosPatrones() {
    return this.http.get<Socio[]>(`${this.baseURL}/socios/patrones`)
  }

  setIdSocio(id: number) {
    this.socioId = id
  }

  getIdSocio() {
    return this.socioId
  }

}
