import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { BarcoService } from '../services/barco.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateNumAmarre implements AsyncValidator{

  constructor(private http: HttpClient,
              private barcoService: BarcoService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const numAmarre = control.value;
    const id = this.barcoService.getIdbarco()


    return this.http.get<any>(`http://localhost:8082/barcoByNumAmarre/${numAmarre}`)
      .pipe(
        map(resp => {
          return (resp.idBarco== id && resp.length != 0) ? null : { numAmarreTaken: true };
        }),
        catchError(() => of(null))
      );
  }
}