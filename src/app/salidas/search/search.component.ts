import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Output() searchSalida = new EventEmitter<string>();

  search: string = ""


  filtrarPorSalida() {
    this.searchSalida.emit(this.search)
  }
}
