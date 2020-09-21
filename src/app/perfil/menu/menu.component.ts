import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";
import { UtilsService } from "../../utils.service";
import { Router } from '@angular/router'; 
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  seccion:string = 'listCategoria';
  categoriaAgregada:string;
  getPlatosData:any;
  isLoading:boolean = true;
  getCategoria = [];

  //datos Servior
  arrayCategoria:any;
  formDatCategoria = new FormData();

  constructor(private route:Router,private simpleModalService:SimpleModalService, public utils:UtilsService,private http:HttpClient) { 
  }

  ngAfterViewInit() {
    this.isLoading = false;
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

  agregarPlato(page,categoria){
    console.log("set cat",categoria);
    if(categoria != '-')this.utils.setData({categoria:categoria.nombre});
    this.seccion = page;
  }

  agregarCategoria(){
    this.showConfirm()
  }

  agregarPlatos(){
    this.seccion = 'altaPlatos';
  }

  //elminar categoria
  eliminarCategoria(data) {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'ELIMINAR',
      message: '¿Seguro que desea eliminar la categoría '+data.nombre+'?',
      opciones:'eliminar'
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {

          this.popupDelete(data._id)
           // this.guardarCategoría();
        }
        else {
            //alert('declined');
        }
    });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
  }


  //agregar categoria

  showConfirm() {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Agregar categoría',
      message: '',
      opciones:'agregarCategoria'
    })
    .subscribe((isConfirmed)=>{

        if(isConfirmed) {
          this.seccion = 'listaPlatos';
          console.log("se guardo la categoria",this.seccion);
          this.postCategoria(this.utils.getData().categoria);
        }
        else {
            //alert('declined');
        }
    });

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
    this.getCategoria =data.categoria;
  }

  //POST CATEGORIA
  postCategoria(categoria){
    console.log("estoy en categorias POST",categoria);

      let data = {
        'id_admin':this.utils.getIdResto().resto.id_admin,
        'nombre':categoria
      }

      this.utils.postConfig(this.utils.urlDev()+'categoria',data) 
        .subscribe( 
          (data) => {

            console.log("data ok ->",data);
            this.showConfirmOK('La categoria se guardo correctamente!');
            this.getCategorias(this.utils.getIdResto().resto);

            //this.saveImg(formDatCategoria)

            //id.reset();
            //this.imgURLPreview = undefined;
          },
          err =>{
            console.log("ERROR",err);
          }

        );
  }


  //DELETE CATEGORIA

  popupDelete(id){
    
    this.utils.deleteConfig(this.utils.urlDev()+'categoria/'+id)
      .subscribe(
        (data) => {
          console.log("data->",data);
          this.showConfirmOK("Se elimino correctamente!")
          this.getCategorias(this.utils.getIdResto().resto);
        },
        err =>{
          console.log("ERROR",err);
          alert(err);
        }

      );
  }

  //------------

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

}
