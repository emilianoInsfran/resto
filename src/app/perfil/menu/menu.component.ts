import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";
import { UtilsService } from "../../utils.service";
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  seccion:string = 'listCategoria';
  categoriaAgregada:string;
  getPlatosData:any;

  getCategoria = [
    {
      id:1,
      nombre:'Pizza',
      descripcion:''
    },    {
      id:1,
      nombre:'Empanada',
      descripcion:''
    },    {
      id:1,
      nombre:'Estofado',
      descripcion:''
    },    {
      id:1,
      nombre:'Papas fritas',
      descripcion:''
    },    {
      id:1,
      nombre:'Milanesa',
      descripcion:''
    },   {
      id:1,
      nombre:'Hamburguesa',
      descripcion:''
    }
    
  ];

  constructor(private route:Router,private simpleModalService:SimpleModalService, public utils:UtilsService) { 
  }

  ngOnInit(): void {
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


  //agregar categoria

  showConfirm() {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Agregar categoría',
      message: '',
      opciones:'agregarCategoria'
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {
          this.seccion = 'listaPlatos';
          console.log("se guardo la categoria",this.seccion);
          this.getSelectCategoria(this.utils.getData());
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

  getSelectCategoria(data){
    this.categoriaAgregada = data.categoria;
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

}
