import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, Salida, SalidaData } from '../interfaces/Salida';
import { Barco } from '../interfaces/Barco';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  private baseURL = "http://localhost:8082"
  constructor(private http: HttpClient) { }

  getSalidas(): Observable<SalidaData[]> {
    return this.http.get<SalidaData[]>(`${this.baseURL}/salidas`)
  }

  getSalidaById(id: number): Observable<SalidaData> {
    return this.http.get<SalidaData>(`${this.baseURL}/salida/${id}`)
  }

  postSalida(salida: any) {
    return this.http.post<any>(`${this.baseURL}/salida`, salida)
  }

  putSalida(salida: Omit<SalidaData, "idSalida">, id: number) {
    return this.http.put<Salida>(`${this.baseURL}/salida/${id}`, salida)
  }

  deleteSalida(id:number) {
    return this.http.delete<Salida>(`${this.baseURL}/salida/${id}`)
  }

  getSalidasByBarco(id: number) {
    return this.http.get<SalidaData[]>(`${this.baseURL}/salidas/barco/${id}`)
  }

  getSalidasByDestino(destino: string) {
    return this.http.get<SalidaData[]>(`${this.baseURL}/salidas/${destino}`)
  }


}
