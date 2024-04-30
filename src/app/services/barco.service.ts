import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barco } from '../interfaces/Barco';

@Injectable({
  providedIn: 'root'
})
export class BarcoService {

  private baseURL = "http://localhost:8082"
  constructor(private http: HttpClient) { }

  private barcoId!: number

  getBarcos(): Observable<Barco[]> {
    return this.http.get<Barco[]>(`${this.baseURL}/barcos`)
  }

  getBarcoById(id: number): Observable<Barco> {
    return this.http.get<Barco>(`${this.baseURL}/barco/${id}`)
  }

  postBarco(barco: Omit<Barco, "idBarco">) {
    return this.http.post<Barco>(`${this.baseURL}/barco`, barco)
  }

  putBarco(barco: Omit<Barco, "idBarco">, id: number) {
    return this.http.put<Barco>(`${this.baseURL}/barco/${id}`, barco)
  }

  deleteBarco(id:number) {
    return this.http.delete<Barco>(`${this.baseURL}/barco/${id}`)
  }

  setIdBarco(id: number) {
    this.barcoId = id
  }

  getIdbarco() {
    return this.barcoId
  }

}
