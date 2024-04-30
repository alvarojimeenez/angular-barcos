import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ListBarcosComponent } from './list-barcos/list-barcos.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBarcoComponent } from './add-barco/add-barco.component';



@NgModule({
  declarations: [
    ListBarcosComponent,
    AddBarcoComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    JsonPipe
  ]
})
export class BarcosModule { }
