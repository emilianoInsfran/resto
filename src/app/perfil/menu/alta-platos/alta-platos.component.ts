import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from "../../../utils.service";
import { Router } from '@angular/router'; 
import { SimpleModalService } from "ngx-simple-modal";
import { PopupComponent } from '../../../popup/popup.component';


@Component({
  selector: 'app-alta-platos',
  templateUrl: './alta-platos.component.html',
  styleUrls: ['./alta-platos.component.scss']
})
export class AltaPlatosComponent implements OnInit {
  imgURLPreview:any = 'http://via.placeholder.com/150x150';
  imagePath:any;
  itemsAsObjects:any;
  arrayCategoria:any;
  habilitarBtn:boolean = true;
  altaPlatosForm = new FormGroup({
    nombrePlato: new FormControl('',Validators.required),
    descripcionPlato: new FormControl('',Validators.required),
    precioPlatoChico: new FormControl(''),
    precioPlatoMediano: new FormControl(''),
    precioPlatoGrande: new FormControl(''),
    checkPlatoChico: new FormControl(''),
    checkPlatoMediano: new FormControl(''),
    checkPlatoGrande: new FormControl(''),
    categoria: new FormControl('',Validators.required),
    tipoComida: new FormControl('',Validators.required),
  });
  seccion:string;
  @Output()  goBack = new EventEmitter<string>();

  listIngredientes:any=[
    {
      id:1,
      nombre:'muzzarella',
      agregado:true
    },
    {
      id:1,
      nombre:'Pepino',
      agregado:false

    },    {
      id:1,
      nombre:'Ajo',
      agregado:true

    },
  ]
  constructor(private route:Router, public utils:UtilsService,private simpleModalService:SimpleModalService) { }

  ngOnInit(): void {
    this.arrayCategoria = this.getArrayCategoria();
  }

  //mostrar list platos 

  goback(page){
    this.goBack.emit(page)
  }

  agregarPlato(){
    console.log('=>',this.altaPlatosForm.value);
    console.log("itemsAsObjects->",this.itemsAsObjects);
    this.showConfirm()
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

  onTagEdited(data){
    console.log("tags->",data);
  }

  getSelectAddId(data){
    console.log("getSelectAddId->",data);
  }

  getValidate(){
    return true;
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

  //carga de imagen
  cargarImgPlato(imagen){
    console.log("imagen",imagen);

    var reader = new FileReader();
    this.imagePath = imagen;
    reader.readAsDataURL(imagen[0]); 
    reader.onload = (_event) => { 
      this.imgURLPreview = reader.result; 
    }
  }
  
  upload(){
    document.getElementById("plato").click();
  }


  showConfirm() {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: 'Se Guardo con exito! :)',
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
        this.gotoPage('','perfil');

    },2000);
    

  }


}
