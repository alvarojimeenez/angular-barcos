import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSalidaComponent } from './add-salida/add-salida.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ListSalidasDelBarcoComponent } from './list-salidas-del-barco/list-salidas-del-barco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSalidasComponent } from './list-salidas/list-salidas.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AddSalidaComponent,
    ListSalidasDelBarcoComponent,
    ListSalidasComponent,
    SearchComponent
    
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class SalidasModule { }
