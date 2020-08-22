import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../app/utils.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  getPlatosData=[];
  unidades:number=1;
  total:number=1000;
  arrayIngredientes=[];
  setIngredientes:boolean;
  opciones:string='Mostrar más opciones'
  constructor(private route:Router, private utils:UtilsService) { 
    this.cambioCategoria();
  }
  ngOnInit(): void {
    this.arrayIngredientes = this.getingredientes();
  }

  cambioCategoria(){
    this.getPlatosData.push(this.utils.getData());
    console.log('=>', this.getPlatosData);
  }

  suma(){
    this.unidades = this.unidades +1;
  }
  
  resta(){
    this.unidades = this.unidades -1;
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

  getNameOpciones(name){
    if(name =='Mostrar más opciones') this.opciones = 'Ocultar';
    else  this.opciones = 'Mostrar más opciones'
  }

  getingredientes(){
    return [
      {
        nombre:'Ajo',
        value:true
        
      },      {
        nombre:'Orégano',
        value:true
        
      },      {
        nombre:'Pepino',
        value:true
        
      },      {
        nombre:'Aceitunas',
        value:true
        
      },
    ]
  }


}
