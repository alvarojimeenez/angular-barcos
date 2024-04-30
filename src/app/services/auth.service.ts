import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/LoginResponse';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Socio } from '../interfaces/Socio';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8082"
  constructor(private http: HttpClient,
              private router: Router) { }

  nameSocio !: string

  role = signal("")
  name = signal("")

  update() {
    if (localStorage.getItem("token") !=null){
      const decodedToken : any = jwtDecode(localStorage.getItem("token") || "")
      this.name.update(old => decodedToken.name)
      this.role.update(old => decodedToken.role)

    }
  }

  login(dni: string, password: string): Observable<Boolean | string> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/signin`, { dni, password })
      .pipe(
        tap(resp => {
          localStorage.setItem("token", resp.token)
          
        }),
        map(resp => true),
        catchError(err => of(err.error.msg))
      )
  }

  getUser() {
    if (this.isAuthenticated()) {

      const decodedToken : any = jwtDecode(localStorage.getItem("token") || "")
      console.log(decodedToken)
      const {role, name} = decodedToken
      const socio = {role, name}
      console.log(socio)
      return socio
    }else {
      return ""
    }
  }

  isAuthenticated() {
    let token = localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token") as string) : null
    //console.log(token)
    if (token!=null) {
        return true
      }else {
        return false
      }
  }

  isAdmin() {
    const decodedToken : any = jwtDecode(localStorage.getItem("token") || "")
    const role = decodedToken.role 
    return role === 'ROLE_ADMIN' ? true : false
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigateByUrl('/')
  }

}
