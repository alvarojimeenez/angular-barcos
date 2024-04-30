import { Component, Input, OnInit } from '@angular/core';
import { SalidaData } from '../../interfaces/Salida';
import { SalidaService } from '../../services/salida.service';
import { BarcoService } from '../../services/barco.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-salidas-del-barco',
  templateUrl: './list-salidas-del-barco.component.html',
  styleUrl: './list-salidas-del-barco.component.css'
})
export class ListSalidasDelBarcoComponent implements OnInit{

  salidas : SalidaData[] = []

  nombreBarco !: string

  @Input() id: number = 0

  constructor(private salidaService: SalidaService,
              private barcoService: BarcoService,
              private authService: AuthService) {}


  _socio: any
  ngOnInit(): void {
    this.cargarSalidasDelBarco()
    this.cargarBarco();
    this._socio = this.authService.getUser()
  }

  cargarSalidasDelBarco() {
    this.salidaService.getSalidasByBarco(this.id).subscribe({
      next: salida => this.salidas = salida
    })
  }

  cargarBarco(){
    this.barcoService.getBarcoById(this.id).subscribe({
      next: b => this.nombreBarco = b.nombreBarco
    })
  }

  confirmarBorrado(salida: SalidaData) {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar esta salida?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6BBDE9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarSalida(salida.idSalida)
      }
    });
  }

  eliminarSalida(id: number) {
    this.salidaService.deleteSalida(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Operación exitosa',
          iconColor: "#3A354B",
          text: "Salida eliminada!",
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.cargarSalidasDelBarco()
      }
    })
  }
}
