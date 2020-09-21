import { Component, OnInit,Injectable  } from '@angular/core';
import { UtilsService } from '../../app/utils.service';
import { Router } from '@angular/router'; 
import { PopupComponent } from '../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";
import { format } from 'path';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})

@Injectable()
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
  desabilitarCambio:boolean =  false;
  idResto:string;
  confimarPedido:boolean=false;
  constructor(private route:Router, private utils:UtilsService,private simpleModalService:SimpleModalService,private socket: Socket) { 
    //this.cambioCategoria();
  }

  ngOnInit(): void {

    console.log("user?",this.utils.getIdResto())
    if(this.utils.getIdResto() ){
      console.log("==>>",this.totalPrecio);
      this.cambioCategoria();
    }
    else{
      this.gotoPage('','')
    }

  }

  //CHAT
  connectionSendPedido(){
    this.socket.on('connect', ()=> {
      console.log('Conectado al servidor');
      let usuario = {
        mensaje:'hola Emiliano'
      }
      this.socket.emit('entrarChat', usuario, (resp)=> {
          console.log('Usuarios conectados', resp);
      });

    });
  }

  sendMessage(){

    let obj = {
      para: this.idResto
    }
    console.log("obj socket",obj);
    this.socket.emit("mensajePrivado", obj);
  }
/*
 getMessage() {
     return this.socket
         .fromEvent("message")
         .pipe(map((data) =>{
           console.log("get message socket",data)
         } ));
  }*/
  //-----

  cambioCategoria(){
    console.log("plato agregado->",this.utils.getData());
    console.log("array de platos->",this.utils.getPlatosPedidos());


    this.utils.setPlatosPedidos(this.utils.getData());

    for (let index = 0; index < this.utils.getPlatosPedidos().length; index++) {
      this.getPlatosData.push(this.utils.getPlatosPedidos()[index]);

    }

    console.log('=>', this.getPlatosData);
    this.setObjectDetallePlato();
    this.setTotalPrecio(this.getPlatosData);
  }

  setTotalPrecio(platos){
    let precioPlatoTotal = 0
    for (let index = 0; index < platos.length; index++) {

      console.log("repetirPlato",platos[index].repetirPlato)
      for (let i = 0; i < platos[index].repetirPlato.length; i++) {
        this.suma({});
        if(platos[index].precioPlatoGrande >0) precioPlatoTotal = precioPlatoTotal + platos[index].precioPlatoGrande;
        else if(platos[index].precioPlatoMediano >0) precioPlatoTotal = precioPlatoTotal + platos[index].precioPlatoMediano;
        else precioPlatoTotal = precioPlatoTotal + platos[index].precioPlatoChico;

        console.log("precioPlatoTotal ->",precioPlatoTotal);
      }
    }

    this.totalPrecio = precioPlatoTotal;
    console.log("totalPrecio ->",this.totalPrecio);
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
  }
  
  resta(plato){
    if(this.unidades <= 0) return;
    this.unidades = this.unidades -1;
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

  addMismoPlato(cantidad,posicionMismoPlato,plato) {
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
    let size = (<HTMLInputElement>document.getElementById(`size${cantidad.toString()+posicionMismoPlato.toString()}`)).value;
    console.log("tamaño del plato: ",size);

    if(size == 'chico'){
      this.totalPrecio = this.totalPrecio + this.getPlatosData[cantidad].precioPlatoChico;
    }
    else if(size == 'mediano'){
      this.totalPrecio = this.totalPrecio + this.getPlatosData[cantidad].precioPlatoMediano;
    }
    else {
      this.totalPrecio = this.totalPrecio + this.getPlatosData[cantidad].precioPlatoGrande;
    }

    console.log("totalPrecio: ",this.totalPrecio);

    let obj = {
      size : '',
      sinIngredientes:[],
      detalle:''
    }
  
    this.getPlatosData[cantidad].cantidadMismoPlato.push(parseInt(this.getPlatosData[cantidad].cantidadMismoPlato.length)+1); 
    this.getPlatosData[cantidad].repetirPlato.push(obj); 
    console.log("push=>",this.getPlatosData[cantidad])
  }

  popMismoPlato(cantidad,posicionMismoPlato,plato){
    console.log("unidades",this.unidades);
    if(this.getPlatosData[cantidad].cantidadMismoPlato.length <= 1) return;
    else{
      this.resta(plato);
      this.cantidadFinal = this.cantidadFinal-1;
  
      //console.log("->",this.arrayRepetirPlato);
      //this.arrayRepetirPlato.pop();
      this.getPlatosData[cantidad].cantidadMismoPlato.pop();
      this.getPlatosData[cantidad].repetirPlato.pop(); 
      console.log("pop=>",this.getPlatosData[cantidad]);


      let size = (<HTMLInputElement>document.getElementById(`size${cantidad.toString()+posicionMismoPlato.toString()}`)).value;
      console.log("tamaño del plato: ",size);
  
      if(size == 'chico'){
        this.totalPrecio = this.totalPrecio - this.getPlatosData[cantidad].precioPlatoChico;
      }
      else if(size == 'mediano'){
        this.totalPrecio = this.totalPrecio - this.getPlatosData[cantidad].precioPlatoMediano;
      }
      else {
        this.totalPrecio = this.totalPrecio - this.getPlatosData[cantidad].precioPlatoGrande;
      }
  
      console.log("totalPrecio: ",this.totalPrecio);
    }

  }

  getPrecioCantidadMismoPlato(position){
    let precioPlatoTotal = 0;

    for (let index = 0; index < this.getPlatosData[position].cantidadMismoPlato.length; index++) {
      this.resta({});

      let size = (<HTMLInputElement>document.getElementById(`size${position.toString()+index.toString()}`)).value;
      if(size == 'chico'){
        precioPlatoTotal = precioPlatoTotal + this.getPlatosData[position].precioPlatoChico;
      }
      else if(size == 'mediano'){
        precioPlatoTotal = precioPlatoTotal + this.getPlatosData[position].precioPlatoMediano;
      }
      else {
        precioPlatoTotal = precioPlatoTotal + this.getPlatosData[position].precioPlatoGrande;
      }

    }

    return precioPlatoTotal;
  }

  removePedido(plato,position){
    this.totalPrecio = this.totalPrecio - this.getPrecioCantidadMismoPlato(position);
    console.log("totalPrecio",this.totalPrecio);

    console.log("eliminando",plato);
    this.utils.eliminarPlato(plato,1);
    this.getPlatosData = this.utils.getPlatosPedidos();


    if(this.getPlatosData.length == 0 ) this.gotoPage('','categoria');
    //this.popMismoPlato('',data);
  }

  setPedido() {
    this.sendMessage(); 
    this.desabilitarCambio = true;

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
    this.showToken('Ingresa el token de pedido')
  }

  preparePedidoFinal(token){
    console.log("peddo confirmado",this.getPlatosData,this.utils.getIdRestoClienteCodigo());
    let arrayPedido  = []
    for (let index = 0; index < this.getPlatosData.length; index++) {
      let data =  this.getPlatosData[index];
      let obj = {
        id_admin:this.utils.getIdRestoCliente().id_admin,
        id_plato:data._id,
        codigo:this.utils.getIdRestoClienteCodigo(),
        informacion:data.repetirPlato,
        cantidad:data.repetirPlato.length,
        nombre_plato:data.nombre,
        para:token.nombre
      }

      arrayPedido.push(obj);
    }

    console.log("objfinal",arrayPedido);
    this.postPedido(arrayPedido,token);
  }

  postPedido(data,codigo){
    console.log("estoy en categorias POST",data);
    let obj={
      pedido:data,
      token:codigo.token,
      id_admin:this.utils.getIdRestoCliente().id_admin
    }

    this.utils.postConfig(this.utils.urlDev()+'pedido',obj) 
      .subscribe( 
        (data) => {
          console.log("data",data)
          if(data.ok){
            this.showConfirmOK('Tu pedido fue recibido!');
            this.reset()
          }
          else{
          }
        },
        err =>{
          this.showWarning('Token Inválido');

          console.log("ERROR",err.error);
        }

      );
  }


  reset(){
    this.getPlatosData = [];
    this.unidades=0;
    this.utils.resetArrayPedido();
    this.utils.setMessageTotal('-');
    this.gotoPage('','categoria');
    //this.showConfirmOK('Su pedido fue confirmado! :)');
  }

  cancelarCompra(){
    this.desabilitarCambio=false;
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


  showToken(message) {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: message,
      opciones:'tokenPedido',
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {
          console.log("token",this.utils.getData());
          this.preparePedidoFinal(this.utils.getData())
        }
        else {
            alert('declined');
        }
    });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    //setTimeout(()=>{
        //disposable.unsubscribe();

        //this.route.navigate(['categoria'])
        
    //},2000);
  }

  
  showWarning(message) {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: message,
      opciones:'warning',
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
