import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SalidaService } from '../../services/salida.service';
import { SalidaData } from '../../interfaces/Salida';
import { BarcosModule } from '../../barcos/barcos.module';
import { BarcoService } from '../../services/barco.service';
import { Barco } from '../../interfaces/Barco';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-salidas',
  templateUrl: './list-salidas.component.html',
  styleUrl: './list-salidas.component.css'
})
export class ListSalidasComponent implements OnInit, OnChanges{

  salidas: SalidaData[] = []
  barco!: Barco

  search: string = ""

  constructor(private salidaService: SalidaService,
              private barcoService: BarcoService) {}

  ngOnInit(): void {
    this.cargarSalidas()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarSalidas()
  }

  cargarSalidas() {
    this.salidaService.getSalidas().subscribe({
      next: s => {
        this.salidas = s
      }
    })
  }

  cargarBarco(id: number) {
    this.barcoService.getBarcoById(id).subscribe({
      next: b => {
        this.barco = b
        Swal.fire({
          title: 'Detalles del barco',
          html: `
            <div class="form-group">
              <label for="matricula">Matrícula:</label>
              <input type="text" id="matricula" class="form-control" value="${this.barco.matricula}" readonly>
            </div>
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input type="text" id="nombre" class="form-control" value="${this.barco.nombreBarco}" readonly>
            </div>
            <div class="form-group">
              <label for="amarre">Numero del amarre:</label>
              <input type="number" id="amarre" class="form-control" value="${this.barco.numAmarre}" readonly>
            </div>
            <div class="form-group">
              <label for="cuota">Cuota:</label>
              <input type="text" id="address" class="form-control" value="${this.barco.cuota}€" readonly>
            </div>
          `,
          confirmButtonText: 'Ok',
          confirmButtonColor: '6BBDE9'
        })
      }
    })
  }

  filtrarPorSalida(search: string) {
    this.search = search
    console.log(this.search)
    if (this.search){
      this.salidaService.getSalidasByDestino(this.search).subscribe({
        next: s => this.salidas = s
      })
    }else {
      this.cargarSalidas()
    }
    
    
  }

}
