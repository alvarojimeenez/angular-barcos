import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnChanges{

  constructor(private router: Router,
              private authService: AuthService) {}

  
  name = this.authService.name
  role = this.authService.role

  isLogin(): boolean {
    return this.router.url === "/"
  }

  isRegisterSocio(): boolean {
    return this.router.url === "/addSocio"
  }

  ngOnInit(): void {
    this.authService.update()
  }

  isAuthenticathed() {
    return this.authService.isAuthenticated()
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.authService.update()
  }

  logout() {
    this.authService.logout()
  }

  confirmarCierreSesion() {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6BBDE9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout()
      }
    });
  }
  

}
