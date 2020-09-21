import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../../app/utils.service';
import { Router } from '@angular/router'; 
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-tomar-pedidos',
  templateUrl: './tomar-pedidos.component.html',
  styleUrls: ['./tomar-pedidos.component.scss']
})
export class TomarPedidosComponent implements OnInit {
  getArrayPedido=[];
  getArrayCodigo=[];
  getArrayMesas=[];
  arrayQRData:any;
  mesasQR:boolean=false;
  pedido:boolean;
  confirmado:boolean;
  preparacion:boolean;
  elaborado:boolean;

  constructor(private utils:UtilsService,private route:Router,private socket: Socket) { 
  }

  ngOnInit() {
    this.getData();
    // this.connectionSendPedido();
  }

  setPedidoMesas(){
    for (let i = 0; i < this.getArrayCodigo.length; i++) {
      for (let index = 0; index < this.getArrayPedido.length; index++) {
        if(this.getArrayPedido[index].codigo.split('.')[0] == this.getArrayCodigo[i].qr.split('.')[0] && this.getArrayPedido[index].codigo.split('.')[1] == this.getArrayCodigo[i].qr.split('.')[1]){
          this.getArrayCodigo[i].pedidos.push(this.getArrayPedido[index]);
        }
      }
    }
    console.log("=>",this.getArrayCodigo)
  }


  getData(){
    console.log("user?",this.utils.getIdResto())
    if(this.utils.getIdResto() ){
      this.getQRMesas(this.utils.getIdResto().resto)
    }
 
    else{
     this.gotoPage('','login')
    }

    //this.getArrayCodigo = this.getCodigo();

  }


  //Get qr 
  getQRMesas(data){
    let id = data.id_admin//userid
    this.utils.getConfig(this.utils.urlDev()+'qr/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("qr->",data);

        this.getArrayPlatos(data);
      });
  }

  getArrayPlatos(data){
    if(data.qr.length != 0){
      this.mesasQR =true;
      this.getArrayCodigo = data.qr;
      this.getpeidoMesas();
    }else{
      this.mesasQR =false;

    }
  }


  getpeidoMesas(){
    this.utils.getConfig(this.utils.urlDev()+'pedido/'+this.utils.getIdResto().resto.id_admin)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("qr->",data);

        this.getArrayPedidos(data);
      });

      setTimeout(()=>{this.getpeidoMesas(); }, 9000);
  }

  getArrayPedidos(data){
    this.getArrayPedido = data.pedido;
    this.clean()
    this.setPedidoMesas();
  }

  clean(){
    for (let i = 0; i < this.getArrayCodigo.length; i++) {
      for (let index = 0; index < this.getArrayPedido.length; index++) {
        if(this.getArrayPedido[index].codigo.split('.')[0] == this.getArrayCodigo[i].qr.split('.')[0] && this.getArrayPedido[index].codigo.split('.')[1] == this.getArrayCodigo[i].qr.split('.')[1]){
          this.getArrayCodigo[i].pedidos=[];
        }
      }
    }
  }

  	//chat

	 //CHAT disconnect
	 connectionSendPedido(){

    console.log('entro en 1')
      this.socket.on('connect', ()=> {
        console.log('Conectado al servidor');
        let usuario = {
        mensaje:'hola resto'
        }
        this.socket.emit('entrarChat', usuario, (resp)=> {
          console.log('Usuarios conectados', resp);
          //this.utils.setIdResto(resp);
        });
    
        this.getMessage();
    
      });
   }
 
   /*sendMessage(msg: string){
   this.socket.emit("message", msg);
   }*/
 
   putIdRestoPedido(){
 
   }
 
   getMessage() {
    this.socket.on('mensajePrivado', (mensaje) => {
      console.log('Mensaje Privado:', mensaje);
    });
   }
   //-----


  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }
}
