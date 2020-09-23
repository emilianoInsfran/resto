import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UtilsService } from '../../app/utils.service';
import { PopupComponent } from '../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  
  getPlatosData=[] ;
  categoriaSeleccionada:string='0';
  isLoading:boolean = true;
  arrayCategoria:any;
  firstGetCategoria:any;
  arrayPlato:any;
  setMenu=[
    {}
  ];
  
  constructor(private route:Router, public utils:UtilsService,private simpleModalService:SimpleModalService  ) {
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  ngOnInit() {
    console.log("user?",this.utils.getIdRestoCliente())
    if(this.utils.getIdRestoCliente() ){
      this.getPlatosData = this.preArmadoObj();

      //this.getQRMesas(this.utils.getIdResto().resto)
      this.getCategorias();
    }
    else{
      this.gotoPage('','')
    }

  }

  cambioCategoria(idCategoria){
    this.categoriaSeleccionada =idCategoria;
  }

  //GET CATEGORIA

  getCategorias(){
    console.log("estoy en categorias GET");//_id que te genera mongo
    let id = this.utils.getIdResto().resto.id_admin//userid
    this.utils.getConfig(this.utils.urlDev()+'categoria/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.getArrayCategoria(data);
      });
  }
  
  getArrayCategoria(data){
    this.arrayCategoria = data.categoria;
    this.setMenu.shift();
    for (let index = 0; index < this.arrayCategoria.length; index++) {

      this.setMenu.push( this.arrayCategoria[index])
    }
    console.log("this.setMenu",this.setMenu);

    this.getPlatos();

  }

  //GET PLATOS

  getPlatos(){

    console.log("estoy en platos GET");//_id que te genera mongo
    let id = this.utils.getIdResto().resto.id_admin//userid
    this.utils.getConfig(this.utils.urlDev()+'allPlato/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.setAllArray(data);
      });
  }

  setAllArray(data){
    let platos = data.plato;
    console.log("armado de array",platos)

    for (let index = 0; index < platos.length; index++) {

      for (let i = 0; i < this.arrayCategoria.length; i++) {
        if (this.arrayCategoria[i]._id == platos[index].id_categoria){
          this.arrayCategoria[i].platos.push(platos[index])
        }
      }
    }

    console.log("this.arrayCategoria",this.arrayCategoria);
    this.getPlatosData =   this.arrayCategoria;
  }
  
  preArmadoObj(){
    //no es el mismo objeto que viene del service y que armo del front (plato y categoria)
    return [];
  }

  gotoPage(codigo,page){
    if(this.utils.getTypeLogin()){
      this.setTipoPedido('Selecciona el tipo de pedido',codigo,page);
    }else{
      this.utils.setData(codigo);
      this.route.navigate([`${page}`])
    }

  }

  setTipoPedido(message,codigo,page) {
    console.log('datos',codigo,page)
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: message,
      opciones:'tipoPedido',
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {
            let codigoFinal = this.utils.getIdRestoClienteCodigo().toString()+'.'+this.utils.getCodigoMesa().toString().slice(0, 3)+'.'+this.utils.getCodigoMesa().toString()[3];
            console.log('codigo',codigoFinal);
            this.utils.setIdRestoClienteCodigo(codigoFinal);
            this.utils.setTypeLogin(false);
            this.utils.setData(codigo);
            this.route.navigate([`${page}`])
        }
        else {
        }
    });

  }

}
