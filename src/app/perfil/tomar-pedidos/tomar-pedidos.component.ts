import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UtilsService } from '../../../app/utils.service';
import { Router } from '@angular/router'; 

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
  pedido:boolean=true;
  confirmado:boolean;
  preparacion:boolean;
  elaborado:boolean;

  constructor(private utils:UtilsService,private route:Router) { 
  }

  ngOnInit() {
    this.getData();
    this.utils.setIsCallservicePedido(true);
    this.utils.setCallServicePedidoInit(1);
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
      console.log("NUMERO**",this.utils.callServicePedidoInit() )
      if(this.utils.callServicePedidoInit() <= 1) this.getpeidoMesas();
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

      console.log("numero de llamadas->",this.utils.callServicePedidoInit());
        if(this.utils.isCallservicePedido()){
          setTimeout(()=>{
            this.getpeidoMesas(); 
          }, 9000);
        }

  }

  getArrayPedidos(data){
    this.getArrayPedido = data.pedido;
    this.clean()
    this.setPedidoMesas();
  }



  //PUT 
  updateEstado(estado,id){
    console.log("estado",estado,id);
    this.utils.putConfig(this.utils.urlDev()+'qr/'+id,{estado:estado})
    .subscribe(
      (data) => {
        console.log("data->",data);
        //this.showConfirm();
      },
      err =>{
        //this.showLoading =false;
        console.log("ERROR",err);
        alert('Intente Nuevamente y verifique que todos los campos esten correctos');
      }

    );
  }

  updateToken(id){
    console.log("token",id);
    this.utils.putConfig(this.utils.urlDev()+'qrToken/'+id,{})
    .subscribe(
      (data) => {
        console.log("data->",data);
        this.setToken(data);
        //this.showConfirm();
      },
      err =>{
        //this.showLoading =false;
        console.log("ERROR",err);
        alert('Intente Nuevamente y verifique que todos los campos esten correctos');
      }

    );
  }

  setToken(data){
    for (let index = 0; index < this.getArrayCodigo.length; index++) {
      if(this.getArrayCodigo[index]._id == data.categoria._id) this.getArrayCodigo[index].token = data.categoria.token;
    }
  }
  //--

  clean(){
    for (let i = 0; i < this.getArrayCodigo.length; i++) {
      for (let index = 0; index < this.getArrayPedido.length; index++) {
        if(this.getArrayPedido[index].codigo.split('.')[0] == this.getArrayCodigo[i].qr.split('.')[0] && this.getArrayPedido[index].codigo.split('.')[1] == this.getArrayCodigo[i].qr.split('.')[1]){
          this.getArrayCodigo[i].pedidos=[];
        }
      }
    }
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }

  ngOnDestroy() {
    console.log("se destruye!")
    this.utils.setIsCallservicePedido(false);
    this.utils.setCallServicePedidoInit(-1);
  }
}
