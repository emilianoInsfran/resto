import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../../utils.service";
import { Router } from '@angular/router'; 
import { SimpleModalService } from "ngx-simple-modal";
import { PopupComponent } from '../../../popup/popup.component';

@Component({
  selector: 'app-lista-platos',
  templateUrl: './lista-platos.component.html',
  styleUrls: ['./lista-platos.component.scss']
})
export class ListaPlatosComponent implements OnInit {
  getPlatosData:any;
  arrayCategoria:any;

  constructor(private route:Router, public utils:UtilsService,private simpleModalService:SimpleModalService) { 
    this.arrayCategoria = this.getArrayCategoria();

    this.getPlatosData = this.getPlatos() ;
  }

  ngOnInit(): void {
  }

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
          this.showConfirmOK("Se elimino correctamente!")
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



  getArrayCategoria(){
    return [
      {
        _id:1,
        nombre:'Pizza'
      },
      {
        _id:2,
        nombre:'Empanada'
      }
    ]
  }


  getPlatos(){
    let x= {
        categoria:'Pizza',
        platos:[
          {
            id:1,
            nombre:'piza 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano'],
            precioPlatoChico: 1,
            precioPlatoMediano: 1,
            precioPlatoGrande: 1,
            checkPlatoChico:true,
            checkPlatoMediano: true,
            checkPlatoGrande: true,
            idCategoria: 1,
            tipoComida: 1,
            ingredientes:['ajo','muzzarela']
    
          },
             {
            id:1,
            nombre:'piza 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano'],
            precioPlatoChico: 1,
            precioPlatoMediano: 1,
            precioPlatoGrande: 1,
            checkPlatoChico:true,
            checkPlatoMediano: true,
            checkPlatoGrande: true,
            idCategoria: 1,
            tipoComida: 1,
            ingredientes:['ajo','muzzarela']
    
          },
          {
            id:1,
            nombre:'piza 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano'],
            precioPlatoChico: 1,
            precioPlatoMediano: 1,
            precioPlatoGrande: 1,
            checkPlatoChico:true,
            checkPlatoMediano: true,
            checkPlatoGrande: true,
            idCategoria: 1,
            tipoComida: 1,
            ingredientes:['ajo','muzzarela']
    
          },
          {
            id:1,
            nombre:'piza 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano'],
            precioPlatoChico: 1,
            precioPlatoMediano: 1,
            precioPlatoGrande: 1,
            checkPlatoChico:true,
            checkPlatoMediano: true,
            checkPlatoGrande: true,
            idCategoria: 1,
            tipoComida: 1,
            ingredientes:['ajo','muzzarela']
    
          },
        ]
      }

    return x;

  }

}
