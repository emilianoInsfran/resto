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
  ngOnInit(): void {
    this.utils.setActiveEstado(1);
    this.getEstadoPedidos();
    this.goCategoria();
  }

  goCategoria(){
    setTimeout(()=>{
      this.route.navigate(['categoria'])
    }, 45000);
  }
  
  getEstadoPedidos(){
    console.log("estoy en categorias GET");//_id que te genera mongo
    //let id = this.utils.getIdResto().resto.id_admin//userid
    let id = 920;
    this.utils.getConfig(this.utils.urlDev()+'qrToken/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.getArrayEstado(data);
      });


      if(this.utils.getActiveEstado() == 1 ){
        setTimeout(()=>{
          this.getEstadoPedidos(); 
        }, 5000);
      }
  }
  
  getArrayEstado(data){
    this.arrayPedido = data.pedido; 

    console.log("this.setMenu",this.arrayPedido);
  }

  redirect(page){
    this.route.navigate([`${page}`])
  }

  ngOnDestroy() {
    this.utils.setActiveEstado(2);
  }

}
