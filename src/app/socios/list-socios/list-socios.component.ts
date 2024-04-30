import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Socio } from '../../interfaces/Socio';
import { SocioService } from '../../services/socio.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-socios',
  templateUrl: './list-socios.component.html',
  styleUrl: './list-socios.component.css'
})
export class ListSociosComponent implements OnInit, OnChanges{

  socios: Socio[] = []

  sociosPatrones: any = []

  role = this.authService.role

  constructor(private socioService: SocioService,
              private authService: AuthService) {}



  _socio: any

  ngOnInit(): void {
    this.cargarSocios()
    this.getSociosPatrones()
    this._socio = this.authService.getUser()
    this.authService.update()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._socio = this.authService.getUser()
  }

  cargarSocios() {
    this.socioService.getSocios().subscribe({
      next: socio =>  {
        console.log(socio)
        this.socios = socio
      }
    })
  }

  confirmarBorrado(socio: Socio) {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este socio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6BBDE9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarSocio(socio.idSocio)
      }
    });
  }

  eliminarSocio(id: number) {
    this.socioService.deleteSocio(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Operación exitosa',
          iconColor: "#3A354B",
          text: "Socio eliminado!",
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.cargarSocios()
      }
    })
  }

  getSociosPatrones() {
    this.socioService.getSociosPatrones().subscribe({
      next: sp => sp.forEach(element => {
        this.sociosPatrones.push(element.dni)
        console.log(this.sociosPatrones)
      })
    })
  }


  getSocioById(socio:Socio) {
    
    if (this._socio.role === "ROLE_ADMIN") {

      Swal.fire({
        title: 'Detalles del socio',
        html: `
          <div class="form-group">
            <label for="firstName">Nombre:</label>
            <input type="text" id="name" class="form-control" value="${socio.name}" readonly>
          </div>
          <div class="form-group">
            <label for="lastName">Apellidos:</label>
            <input type="text" id="lastName" class="form-control" value="${socio.lastName}" readonly>
          </div>
          <div class="form-group">
            <label for="username">Dni:</label>
            <input type="text" id="dni" class="form-control" value="${socio.dni}" readonly>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" class="form-control" value="${socio.email}" readonly>
          </div>
          <div class="form-group">
            <label for="phone">Dirección:</label>
            <input type="text" id="address" class="form-control" value="${socio.address}" readonly>
          </div>
          <div class="form-group">
            <label for="phone">Teléfono:</label>
            <input type="tel" id="phone" class="form-control" value="${socio.phone}" readonly>
          </div>
        `,
        confirmButtonText: 'Ok',
        confirmButtonColor: '6BBDE9'
      })
    }else {
      Swal.fire({
        title: 'Detalles del socio',
        html: `
          <div class="form-group">
            <label for="firstName">Nombre:</label>
            <input type="text" id="name" class="form-control" value="${socio.name}" readonly>
          </div>
          <div class="form-group">
            <label for="lastName">Apellidos:</label>
            <input type="text" id="lastName" class="form-control" value="${socio.lastName}" readonly>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" class="form-control" value="${socio.email}" readonly>
          </div>
          <div class="form-group">
            <label for="phone">Dirección:</label>
            <input type="text" id="address" class="form-control" value="${socio.address}" readonly>
          </div>
          <div class="form-group">
            <label for="phone">Teléfono:</label>
            <input type="tel" id="phone" class="form-control" value="${socio.phone}" readonly>
          </div>
        `,
        confirmButtonText: 'Ok',
        confirmButtonColor: '6BBDE9'
      })
    }
  }

}
