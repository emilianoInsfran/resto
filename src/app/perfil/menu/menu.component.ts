import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  getCategoria = [
    {
      id:1,
      nombre:'Pizza',
      descripcion:''
    },    {
      id:1,
      nombre:'Empanada',
      descripcion:''
    },    {
      id:1,
      nombre:'Estofado',
      descripcion:''
    },    {
      id:1,
      nombre:'Papas fritas',
      descripcion:''
    },    {
      id:1,
      nombre:'Milanesa',
      descripcion:''
    },   {
      id:1,
      nombre:'Hamburguesa',
      descripcion:''
    }
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

  agregarPlato(categoria){
    console.log("set cat",categoria);
  }

}
