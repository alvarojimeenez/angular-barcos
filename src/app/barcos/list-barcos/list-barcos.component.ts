import { Component, OnInit } from '@angular/core';
import { Barco } from '../../interfaces/Barco';
import { BarcoService } from '../../services/barco.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-barcos',
  templateUrl: './list-barcos.component.html',
  styleUrl: './list-barcos.component.css'
})
export class ListBarcosComponent implements OnInit{

  barcos : Barco[] = [] 

  constructor(private barcoService: BarcoService,
              private authService: AuthService) {}

  _socio: any

  ngOnInit(): void {
    this.cargarBarcos()
    this._socio = this.authService.getUser()
  }

  cargarBarcos() {
    this.barcoService.getBarcos().subscribe({
      next: b => this.barcos = b
    })
  }


  confirmarBorrado(barco: Barco) {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este barco?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6BBDE9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarBarco(barco.idBarco)
      }
    });
  }

  eliminarBarco(id: number) {
    this.barcoService.deleteBarco(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Operación exitosa',
          iconColor: "#3A354B",
          text: "Barco eliminado!",
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.cargarBarcos()
      }
    })
  }

}
