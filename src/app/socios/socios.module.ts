import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSociosComponent } from './list-socios/list-socios.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddSocioComponent } from './add-socio/add-socio.component';
import { DetailSocioComponent } from './detail-socio/detail-socio.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListSociosComponent,
    AddSocioComponent,
    DetailSocioComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ]
})
export class SociosModule { }
