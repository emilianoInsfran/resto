import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from "../../../utils.service";
import { Router } from '@angular/router'; 
import { SimpleModalService } from "ngx-simple-modal";
import { PopupComponent } from '../../../popup/popup.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-alta-platos',
  templateUrl: './alta-platos.component.html',
  styleUrls: ['./alta-platos.component.scss']
})
export class AltaPlatosComponent implements OnInit {
  platoChico:boolean=false;
  platoMediano:boolean=false;
  platoGrande:boolean=false;
  imgURLPreview:any = 'http://via.placeholder.com/150x150';
  imagePath:any;
  putImage:boolean=false;
  itemsAsObjects:any;
  arrayCategoria:any;
  setArrayTipoComida:any;
  habilitarBtn:boolean = true;
  altaPlatosForm = new FormGroup({
    nombrePlato: new FormControl('',Validators.required),
    descripcionPlato: new FormControl('',Validators.required),
    precioPlatoChico: new FormControl({value:0,disabled: true}),
    precioPlatoMediano: new FormControl({value:0,disabled: true}),
    precioPlatoGrande: new FormControl({value:0,disabled: true}),
    checkPlatoChico: new FormControl(false),
    checkPlatoMediano: new FormControl(false),
    checkPlatoGrande: new FormControl(false),
    categoria: new FormControl('',Validators.required),
  });
  seccion:string;
  imagen:File = null;
  editando:boolean=false;
  btnActualizar = false;

  dataEdit:any;
  options:any;
  _idPlato:string;
  @Output()  goBack = new EventEmitter<string>();

  //MULTISELECT

  dropdownList = [];
  selectedItems :any;
  dropdownSettings:any;
  constructor(private route:Router, public utils:UtilsService,private simpleModalService:SimpleModalService) { }

  ngOnInit(): void {

    console.log("user?",this.utils.getIdResto())
    if(this.utils.getIdResto() ){
      //this.getQRMesas(this.utils.getIdResto().resto)
      this.getCategorias(this.utils.getIdResto().resto);
      this.getTipoComida(this.utils.getIdResto().resto);
    }
    else{
      this.gotoPage('','login')
    }

    console.log("que trajo",this.utils.getData());
    //this.getCategorias();
    //this.getTipoComida();

  }
  //mostrar list platos 

  goback(page){
    this.goBack.emit(page)
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

  //carga de imagen
  cargarImgPlato(imagen){
    console.log("imagen",imagen);
    //muestra la imagen nueva si esta editando y si da de alta no afecta por que ya esta en false
    this.editando = false;
    this.putImage=true;

    var reader = new FileReader();
    this.imagePath = imagen;

    this.imagen = this.imagePath.item(0);
    reader.readAsDataURL(imagen[0]); 
    reader.onload = (_event) => { 
      this.imgURLPreview = reader.result; 
    }
  }
  
  upload(){
    document.getElementById("plato").click();
  }

  //agregar
  agregarPlato(){
    console.log('=>',this.altaPlatosForm.value);
    console.log("itemsAsObjects->",this.itemsAsObjects);

    //this.showConfirm()
  }

  //editar
  getPlatoEditar(plato){

    this.altaPlatosForm.get('precioPlatoChico').enable();
    this.altaPlatosForm.get('precioPlatoMediano').enable();
    this.altaPlatosForm.get('precioPlatoGrande').enable();


    if(plato.checkPlatoChico)this.altaPlatosForm.get('precioPlatoChico').enable();
    if(!plato.checkPlatoChico)this.altaPlatosForm.get('precioPlatoChico').disable();

    if(plato.checkPlatoMediano)this.altaPlatosForm.get('precioPlatoMediano').enable();
    if(!plato.checkPlatoMediano)this.altaPlatosForm.get('precioPlatoMediano').disable();

    if(plato.checkPlatoGrande)this.altaPlatosForm.get('precioPlatoGrande').enable();
    if(!plato.checkPlatoGrande)this.altaPlatosForm.get('precioPlatoGrande').disable();

    console.log("EDITANDO",plato);
    console.log("nombre",plato.nombre);
    this.dataEdit = plato;

    this._idPlato = plato._id;
    this.editando =true;
    this.btnActualizar = true;

    this.altaPlatosForm.setValue({
      nombrePlato: plato.nombre,
      descripcionPlato: plato.descripcion,
      precioPlatoChico:  plato.precioPlatoChico,
      precioPlatoMediano:  plato.precioPlatoMediano,
      precioPlatoGrande:  plato.precioPlatoGrande,
      checkPlatoChico: plato.checkPlatoChico,
      checkPlatoMediano:  plato.checkPlatoMediano,
      checkPlatoGrande:  plato.checkPlatoGrande,
      categoria:  plato.id_categoria,
    });

    console.log(" plato.nombre", plato.nombre);

    this.itemsAsObjects = plato.tags;
  }

  setTipoComidaEdit(){
    let tipo = this.utils.getData();
    console.log("editando tipo de comida",tipo)
    this.selectedItems = tipo.tipoComida;
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
        if(this.utils.getData())this.getPlatoEditar(this.utils.getData());//editanto

      });
  }

  getArrayCategoria(data){
    this.arrayCategoria = data.categoria;
  }

  //POST PLATOS

  postPlato() {
    //this.showLoading =true;

      console.log("estoy en producto POST",this.imagen );

      let formData = new FormData();
      //let nombreImagenSet = new Date().getMilliseconds().toString();

      let plato = this.altaPlatosForm.value;

      if( !plato.checkPlatoChico && !plato.checkPlatoGrande &&  !plato.checkPlatoMediano) {
        this.warning("Tiene que elegir al menos un tamaño de plato");
      }
      else{
        let obj = {
          categoria:plato.categoria,
          checkPlatoChico: plato.checkPlatoChico,
          checkPlatoGrande:plato.checkPlatoGrande,
          checkPlatoMediano:plato.checkPlatoMediano,
          descripcionPlato: plato.descripcionPlato,
          nombrePlato:plato.nombrePlato,
          precioPlatoChico: plato.precioPlatoChico || 0,
          precioPlatoGrande: plato.precioPlatoGrande || 0,
          precioPlatoMediano: plato.precioPlatoMediano || 0,
          tipoComida: this.selectedItems,
          tags:this.itemsAsObjects
        }
  
        formData.append('upload',this.imagen  );
        formData.append('id_categoria',obj.categoria);
        formData.append('id_admin',this.utils.getIdResto().resto.id_admin);
        formData.append('checkPlatoChico',obj.checkPlatoChico);
        formData.append('checkPlatoMediano',obj.checkPlatoMediano);
        formData.append('checkPlatoGrande',obj.checkPlatoGrande);
        formData.append('descripcionPlato',obj.descripcionPlato);
        formData.append('nombrePlato',obj.nombrePlato);
        formData.append('precioPlatoChico',obj.precioPlatoChico );
        formData.append('precioPlatoMediano',obj.precioPlatoMediano);
        formData.append('precioPlatoGrande',obj.precioPlatoGrande);
        formData.append('tipoComida',JSON.stringify(obj.tipoComida));
        formData.append('tags',JSON.stringify(obj.tags));
  
        console.log("formData",obj);
    
      this.utils.postConfig(this.utils.urlDev()+'plato',formData)
          .subscribe(
            (data) => {
              console.log("data->",data);
              //this.saveImg(formData);
              //this.showLoading =false;
              //this.cleanForm();
              this.showConfirm();
            },
            err =>{
              console.log("ERROR",err);
              alert(err);
            }
    
          );
      }
  }

  //PUT PLATO 
  update(){
    console.log("ESTOY ACTUALIZANDO");

    let formData = new FormData();
    //let nombreImagenSet = new Date().getMilliseconds().toString();

    let plato = this.altaPlatosForm.value;

    formData.append('id_categoria',plato.categoria);
    formData.append('id_admin',this.utils.getIdResto().resto.id_admin);
    formData.append('checkPlatoChico',plato.checkPlatoChico);
    formData.append('checkPlatoMediano',plato.checkPlatoMediano);
    formData.append('checkPlatoGrande',plato.checkPlatoGrande);
    formData.append('descripcionPlato',plato.descripcionPlato);
    formData.append('nombrePlato',plato.nombrePlato);
    formData.append('precioPlatoChico',(plato.precioPlatoChico || 0));
    formData.append('precioPlatoMediano',(plato.precioPlatoMediano || 0));
    formData.append('precioPlatoGrande',(plato.precioPlatoGrande || 0));
    formData.append('tipoComida',JSON.stringify(this.selectedItems));
    formData.append('tags',JSON.stringify(this.itemsAsObjects));

    console.log("formData",plato);
    console.log("this.selectedItems",this.selectedItems);
    console.log("this.itemsAsObjects",this.itemsAsObjects);

      //this.showLoading =true;
      let putFormData = new FormData();
      let nombreImagenSet = new Date().getMilliseconds().toString();


      putFormData.append('section','plato');
  
      if(this.putImage){
        console.log("Entro en 1");
        putFormData.append('eliminar','true');
        formData.append('upload',this.imagen  );

        //this.saveImg(putFormData);
      }else{
        console.log("Entro en 2");
        putFormData.append('eliminar','false');
      }

      let id = this._idPlato;
  
      this.utils.putConfig(this.utils.urlDev()+'plato/'+id,formData)
        .subscribe(
          (data) => {
            console.log("data->",data);
            this.putImage = false;
            this.imgURLPreview = undefined;
            //this.showLoading = false;
            this.showConfirm();
          },
          err =>{
            //this.showLoading =false;
            console.log("ERROR",err);
            alert('Intente Nuevamente y verifique que todos los campos esten correctos');
          }
  
        );
  }

  //-------------------

  checkSelectedChico(data){
    console.log("data=chico",data);
    if(data)this.altaPlatosForm.get('precioPlatoChico').enable();
    if(!data)this.altaPlatosForm.get('precioPlatoChico').disable();
    
  }
  checkSelectedMediano(data){
    if(data)this.altaPlatosForm.get('precioPlatoMediano').enable();
    if(!data)this.altaPlatosForm.get('precioPlatoMediano').disable();
  }
  checkSelectedGrande(data){
    if(data)this.altaPlatosForm.get('precioPlatoGrande').enable();
    if(!data)this.altaPlatosForm.get('precioPlatoGrande').disable();
  }

  //popup
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
        this.gotoPage('','listaplatos');

    },2000);
  }

   //popup
   warning(message) {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: message,
      opciones:'warning',
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
    },4000);
  }

    //GET TIPO COMIDA

    getTipoComida(data){
      console.log("estoy en categorias GET");//_id que te genera mongo
      let id = data.id_admin//userid
      this.utils.getConfig(this.utils.urlDev()+'categoria/'+id)
        .subscribe((data) => {
          //this.showLoading = false;
          console.log("data->",data);
          this.getArrayTipoComida(data);
  
        });
    }
  
    getArrayTipoComida(data){
      this.setArrayTipoComida = data.categoria;
      this.getMultiselectInfo(this.setArrayTipoComida);
    }

    //MULTISELECT

    getMultiselectInfo(tipo:any){
      this.dropdownList = [
        { item_id: 1, item_text: 'Vegano' },
        { item_id: 2, item_text: 'Sin TACC ' },
        { item_id: 3, item_text: 'Vegetariano' },
      ];

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Seleccionar todos',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true
      };

      if(this.utils.getData())this.setTipoComidaEdit();//editanto

    }

    onItemSelect(item: any) {
      console.log(item);
      console.log("ngModel data ",this.selectedItems);
    }
    onSelectAll(items: any) {
      console.log(items);
    }


}
