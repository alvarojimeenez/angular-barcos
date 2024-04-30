import { Component, Input, OnInit } from '@angular/core';
import { Socio } from '../../interfaces/Socio';
import { SocioService } from '../../services/socio.service';

@Component({
  selector: 'app-detail-socio',
  templateUrl: './detail-socio.component.html',
  styleUrl: './detail-socio.component.css'
})
export class DetailSocioComponent implements OnInit{

  socio!: Socio

  @Input() id : number = 0;

  constructor(private socioService: SocioService) {}

  ngOnInit(): void {
    this.cargarSocio()
  }

  cargarSocio() {
    this.socioService.getSociosById(this.id).subscribe({
      next: s => this.socio = s
    })
  }

}
