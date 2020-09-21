import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../../utils.service";
import { Router } from '@angular/router'; 
import { SimpleModalService } from "ngx-simple-modal";
import { PopupComponent } from '../../../popup/popup.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-platos',
  templateUrl: './lista-platos.component.html',
  styleUrls: ['./lista-platos.component.scss']
})


export class ListaPlatosComponent implements OnInit {
  getPlatosData:any;
  arrayCategoria:any;
  _idCategoria:number;
  imagePathshow:any;
  isLoading:boolean=true;
  constructor(private route:Router, public utils:UtilsService,private simpleModalService:SimpleModalService,public _sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    console.log("user?",this.utils.getIdResto())
    if(this.utils.getIdResto() ){
      //this.getQRMesas(this.utils.getIdResto().resto)
      this.getCategorias(this.utils.getIdResto().resto);
    }
    else{
      this.gotoPage('','login')
    }
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

  //GET CATEGORIA

  getCategorias(data){
    console.log("estoy en categorias GET");//_id que te genera mongo
    let id = data.id_admin//userid
    this.utils.getConfig(this.utils.urlDev()+'categoria/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.getArrayCategoria(data);
      });
  }

  getArrayCategoria(data){
    this.arrayCategoria = data.categoria;
    let objIdCategoria ={
      value: this.arrayCategoria[0]._id
    }
    this.getSelectAddId(objIdCategoria);
  }

  //GET PLATOS

  getSelectAddId(id){
    console.log('id',id.value);
    this.getPlatos(id.value);
  }

  getPlatos(idCategoria){
    this._idCategoria = idCategoria;
    console.log("estoy en platos GET");//_id que te genera mongo
    let id = this.utils.getIdResto().resto.id_admin//userid
    this.utils.getConfig(this.utils.urlDev()+'plato/'+idCategoria+'/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.getArrayPlatos(data);
      });
  }

  getArrayPlatos(data){
    this.getPlatosData = data.plato;
  }

  //DELETE PLATO

  removePlato(id){
    
    this.utils.deleteConfig(this.utils.urlDev()+'plato/'+id)
      .subscribe(
        (data) => {
          console.log("data->",data);
          this.showConfirmOK("Se elimino correctamente!");
          this.getPlatos(this._idCategoria);
        },
        err =>{
          console.log("ERROR",err);
          alert(err);
        }

      );
  }

  //--------------------
  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

   //elminar categoria
   eliminarPlato(data) {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'ELIMINAR',
      message: '¿Seguro que desea eliminar el plato '+data.nombre+'?',
      opciones:'eliminar'
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {
          this.removePlato(data._id);
           // this.guardarCategoría();
        }
        else {
            //alert('declined');
        }
    });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
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
            //this.gotoPage('','perfil');
        }
        else {
            alert('declined');
        }
    });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    setTimeout(()=>{
        disposable.unsubscribe();
    },2000);
  }
}
