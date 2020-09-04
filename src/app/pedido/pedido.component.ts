import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../app/utils.service';
import { Router } from '@angular/router'; 
import { PopupComponent } from '../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";

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

  confimarPedido:boolean=false;
  constructor(private route:Router, private utils:UtilsService,private simpleModalService:SimpleModalService) { 
    this.cambioCategoria();
  }

  ngOnInit(): void {
    //this.arrayIngredientes = this.getingredientes();
  }

  cambioCategoria(){
    console.log("plato agregado->",this.utils.getData());
    console.log("array de platos->",this.utils.getPlatosPedidos());


    this.utils.setPlatosPedidos(this.utils.getData());

    for (let index = 0; index < this.utils.getPlatosPedidos().length; index++) {
      this.getPlatosData.push(this.utils.getPlatosPedidos()[index]);

      //this.totalPrecio = this.totalPrecio + this.utils.getPlatosPedidos()[index].precio || 0;
      this.unidades =this.unidades+1;
      this.totalPrecio = this.totalPrecio + Number(this.showPrecio(this.utils.getPlatosPedidos()[index]));
    }

    console.log('=>', this.utils.getPlatosPedidos());


    this.setObjectDetallePlato();

  }

  showPrecio(plato){
    if(plato.precioPlatoGrande >0){
      console.log("ENTRO EN 1");
      return plato.precioPlatoGrande
    }else if(plato.precioPlatoMediano > 0 ){
      console.log("ENTRO EN 2");

      return plato.precioPlatoMediano
    }else {
      console.log("ENTRO EN 3");

      return plato.precioPlatoChico
    }
  }

  setObjectDetallePlato(){
    let obj = {
      size : '',
      sinIngredientes:[],
      detalle:''
    }
    this.getPlatosData[this.getPlatosData.length -1].repetirPlato.push(obj);;
    this.getPlatosData[this.getPlatosData.length -1].cantidadMismoPlato.push(1); 

    console.log('pedido actual =>',  this.getPlatosData);
  }

  onOptionsSelectedSize(size){
    console.log("tamaño plato",size);
  }

  suma(plato){
    this.unidades = this.unidades +1;
    //this.totalPrecio = this.totalPrecio +plato.precio;
  }
  
  resta(plato){
    this.unidades = this.unidades -1;
    //this.totalPrecio = this.totalPrecio - plato.precio;
  }

  gotoPage(codigo,page){
    let  palablaPlural = this.unidades == 1 ? 'pedido' :'pedidos';

    this.utils.setMessageTotal(`Tenes agregado ${this.unidades} ${palablaPlural}. Total: ${this.totalPrecio}`);
    console.log(codigo);
    this.utils.setData(codigo);

    this.utils.setMasPedidos(true);

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
    /*la solución es agregar del lado back una propiedad que diga repetirplato = [] -> agregar todos los platos para mandarlos en el pedido .
    se agregara el id del plato en el platos mas la nueva propiedad repetirplato [{   size : '',
      sinIngredientes:[],
      detalle:''}]
    
    hacer lo mismo cno repetir plato:)
    */
    this.suma(plato);
    console.log("mismo plato",cantidad);

    //this.cantidadFinal = this.cantidadFinal+1

    //this.arrayRepetirPlato.push(this.cantidadFinal);

    //let ingredientesDesabilitados = [];

    //let sinIngredientes = (<HTMLInputElement>document.getElementById('sin-ingredientes')).value;
    //let aclarar = (<HTMLInputElement>document.getElementById('aclarar')).value;

    let obj = {
      size : '',
      sinIngredientes:[],
      detalle:''
    }
  
    this.getPlatosData[cantidad].cantidadMismoPlato.push(parseInt(this.getPlatosData[cantidad].cantidadMismoPlato.length)+1); 
    this.getPlatosData[cantidad].repetirPlato.push(obj); 
    console.log("push=>",this.getPlatosData[cantidad])
  }

  popMismoPlato(cantidad,plato){
    if(this.unidades <= 1) return;
    else{
      this.resta(plato);
      this.cantidadFinal = this.cantidadFinal-1;
  
      //console.log("->",this.arrayRepetirPlato);
      //this.arrayRepetirPlato.pop();
      this.getPlatosData[cantidad].cantidadMismoPlato.pop();
      this.getPlatosData[cantidad].repetirPlato.pop(); 
      console.log("pop=>",this.getPlatosData[cantidad]);
    }

  }

  removePedido(plato){
    console.log("eliminando",plato);
    this.utils.eliminarPlato(plato,1);
    this.resta(plato);
    this.getPlatosData = this.utils.getPlatosPedidos();
    if(this.getPlatosData.length == 0 ) this.gotoPage('','categoria');
    //this.popMismoPlato('',data);

  }

  setPedido() {

    for (let i = 0; i < this.getPlatosData.length; i++) {


      for (let index = 0; index < this.getPlatosData[i].repetirPlato.length; index++) {

        let size = (<HTMLInputElement>document.getElementById(`size${i.toString()+index.toString()}`)).value;
        let detalle = (<HTMLInputElement>document.getElementById(`detalle${i.toString()+index.toString()}`)).value;

        this.getPlatosData[i].repetirPlato[index].size = size; 
        this.getPlatosData[i].repetirPlato[index].detalle = detalle; 
        let array = [];
        for (let j = 0; j < this.getPlatosData[i].tags.length; j++) {
          let sinIngredientes = (<HTMLInputElement>document.getElementById(`sin-ingredientes${i.toString()+index.toString()+j.toString()}`)).checked;
          var ingredientes = {
            nombre:this.getPlatosData[i].tags[j].name,
            disabled: sinIngredientes
          }

          array.push(ingredientes); 

        }
        this.getPlatosData[i].repetirPlato[index].sinIngredientes = array
      }
    }

    console.log("tamaño",this.getPlatosData)

    this.confimarPedido=true;
  } 


  //confirmar padido
  confirmarPedido(){
    console.log("peddo confirmado");
    this.getPlatosData = [];
    this.unidades=0;
    this.utils.resetArrayPedido();
    this.utils.setMessageTotal('-');
    this.showConfirmOK('Su pedido fue confirmado! :)');
  }

  cancelarCompra(){
    this.confimarPedido=false;

    for (let index = 0; index < this.getPlatosData.length; index++) {
      //if(this.getPlatosData[index].repetirPlato.sinIngredientes == undefined) return;
      for (let i = 0; i < this.getPlatosData[index].repetirPlato.length; i++) {
        this.getPlatosData[index].repetirPlato[i].sinIngredientes = []
      }
    }
  }

  showConfirmOK(message) {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: message,
      opciones:'confirmacion',
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {
        }
        else {
            alert('declined');
        }
    });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    setTimeout(()=>{
        disposable.unsubscribe();

        //this.route.navigate(['categoria'])

    },2000);
  }




}
