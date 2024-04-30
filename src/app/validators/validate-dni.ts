import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { SocioService } from '../services/socio.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateDniService implements AsyncValidator{

  constructor(private http: HttpClient,
              private socioService: SocioService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const dni = control.value;
    const id = this.socioService.getIdSocio()

    return this.http.get<any>(`http://localhost:8082/socioByDni/${dni}`)
      .pipe(
        map(resp => {
          return (resp.idSocio== id && resp.length != 0) ? null : { dniTaken: true };
        }),
        catchError(() => of(null))
      );
  }
}