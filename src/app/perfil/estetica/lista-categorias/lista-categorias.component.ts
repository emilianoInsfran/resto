import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {
  Movies = [
    'Pizza',
    'Empanada',
    'Estofado',
    'Asado',
    'Papas fritas',
    'Milanesa',
    'Hamburguesa'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  }
  
  guardarOrdenCategoria(){
    console.log('categorias',this.Movies)
  }
}
