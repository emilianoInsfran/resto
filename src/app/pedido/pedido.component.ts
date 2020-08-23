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
  unidades:number=0;
  total:number=1000;
  arrayIngredientes=[];
  setIngredientes:boolean;
  opciones:string='Mostrar más opciones';
  pedido=[{
    size : '',
    sinIngredientes:[],
    detalle:''
  }];
  arrayRepetirPlato=[1];
  cantidadFinal:number =1;
  totalPrecio:number=0;
  platoSeleccionado:number;
  constructor(private route:Router, private utils:UtilsService) { 
    this.cambioCategoria();
  }

  ngOnInit(): void {
    this.arrayIngredientes = this.getingredientes();
  }

  cambioCategoria(){
    this.utils.setPlatosPedidos(this.utils.getData());

    for (let index = 0; index < this.utils.getPlatosPedidos().length; index++) {
      this.getPlatosData.push(this.utils.getPlatosPedidos()[index]);
      this.totalPrecio = this.totalPrecio + this.utils.getPlatosPedidos()[index].precio || 0;
      this.unidades =this.unidades+1;
    }
    console.log('=>', this.utils.getPlatosPedidos());
  }

  suma(plato){
    this.unidades = this.unidades +1;
    this.totalPrecio = this.totalPrecio +plato.precio;
  }
  
  resta(plato){
    this.unidades = this.unidades -1;
    this.totalPrecio = this.totalPrecio - plato.precio;
  }

  gotoPage(codigo,page){
    let  palablaPlural = this.unidades == 1 ? 'pedido' :'pedidos';

    this.utils.setMessageTotal(`Tenes agregado ${this.unidades} ${palablaPlural}. Total: ${this.totalPrecio}`);
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

  getNameOpciones(opciones){
    
    /*if(name =='Mostrar más opciones') this.opciones = 'Ocultar';
    else  this.opciones = 'Mostrar más opciones';*/
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

  addMismoPlato(cantidad,plato) {

    this.suma(plato);
    console.log("mismo plato",cantidad);

    this.cantidadFinal = this.cantidadFinal+1

    this.arrayRepetirPlato.push(this.cantidadFinal);

    //let ingredientesDesabilitados = [];



    //let sinIngredientes = (<HTMLInputElement>document.getElementById('sin-ingredientes')).value;
    //let aclarar = (<HTMLInputElement>document.getElementById('aclarar')).value;

    let obj = {
      size : '',
      sinIngredientes:[],
      detalle:''
    }
  
    this.pedido.push(obj); 
  }

  popMismoPlato(cantidad,plato){
    if(this.unidades <= 1) return;
    else{
      this.resta(plato);
      this.cantidadFinal = this.cantidadFinal-1;
  
      console.log("->",this.arrayRepetirPlato);
      this.arrayRepetirPlato.pop();
      this.pedido.pop();
    }

  }

  removePedido(data){
    console.log("eliminando",data)
  }

  setPedido() {


    for (let index = 0; index < this.pedido.length; index++) {
      let size = (<HTMLInputElement>document.getElementById(`size${index.toString()}`)).value;
      let detalle = (<HTMLInputElement>document.getElementById(`detalle${index.toString()}`)).value;

      for (let j = 0; j < this.arrayIngredientes.length; j++) {
        let sinIngredientes = (<HTMLInputElement>document.getElementById(`sin-ingredientes${index.toString()+j.toString()}`)).checked;
        console.log("sinIngredientes",sinIngredientes);
        let ingredientes = {
          nombre:this.arrayIngredientes[j].nombre,
          disabled: sinIngredientes
        }
        this.pedido[index].sinIngredientes.push(ingredientes); 
      }

      this.pedido[index].size = size; 
      this.pedido[index].detalle = detalle; 
    }

    console.log("tamaño",this.pedido);

  } 


}
