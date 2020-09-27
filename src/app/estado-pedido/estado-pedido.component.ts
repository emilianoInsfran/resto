import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../app/utils.service';
import { PopupComponent } from '../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-estado-pedido',
  templateUrl: './estado-pedido.component.html',
  styleUrls: ['./estado-pedido.component.scss']
})
export class EstadoPedidoComponent implements OnInit {

  constructor(private route:Router, public utils:UtilsService,private simpleModalService:SimpleModalService ) { }
  arrayPedido=[];
  tokenPedido:number;
  id:number;
  setCodigo:boolean=true;
  isLoading:boolean=false;
  ngOnInit(): void {
    this.utils.setActiveEstado(1);
  }

  goCategoria(){
    if(this.utils.getActiveEstado() == 1 ){
      setTimeout(()=>{
        this.route.navigate(['categoria'])
      }, 45000);
    }

  }

  setCodigoService(){
    this.utils.setActiveEstado(1);
    this.id = this.tokenPedido;
    this.getEstadoPedidos();
  }

  getEstadoPedidos(){
    console.log("estoy en categorias GET", this.id);//_id que te genera mongo
    //let id = this.utils.getIdResto().resto.id_admin//userid
    let id = this.id;
    this.isLoading = true;
    this.utils.getConfig(this.utils.urlDev()+'qrToken/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.getArrayEstado(data);
      },
      err =>{
        //this.showLoading =false;
        console.log("ERROR",err);
        this.utils.setActiveEstado(2);
        this.showWarning('CÓDIGO INVÁLIDO');
      });
  }
  
  getArrayEstado(data){
    if(data.ok){
      this.goCategoria();
      this.setCodigo=false;
      this.arrayPedido = data.pedido; 
      if(this.utils.getActiveEstado() == 1 ){
        setTimeout(()=>{
          this.getEstadoPedidos(); 
        }, 5000);
      }
    }else{
      this.utils.setActiveEstado(2);
      this.showWarning('CÓDIGO INVÁLIDO')
    }

    console.log("this.setMenu",this.arrayPedido);
  }

  redirect(page){
    this.route.navigate([`${page}`])
  }

  ngOnDestroy() {
    this.utils.setActiveEstado(2);
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
