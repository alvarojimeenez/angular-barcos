import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { SocioService } from '../services/socio.service';
import { Socio } from '../interfaces/Socio';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailService implements AsyncValidator{

  constructor(private http: HttpClient,
              private socioService: SocioService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const id = this.socioService.getIdSocio()
    console.log(id)


    return this.http.get<any>(`http://localhost:8082/socioByEmail/${email}`)
      .pipe(
        map(resp => {
          console.log(resp)
          return (resp.idSocio== id && resp.length != 0) ? null : { emailTaken: true } ;
        }),
        catchError(() => of(null))
      );
  }
}