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
    this.getPlatosData = this.getPlatos() ;
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

  getSelectCategoria(data){
    this.categoriaAgregada = data.categoria;
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

  procesaGoBack(page){
    console.log("page",page);
    this.seccion = page;
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
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'piza 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'piza 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'piza 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'piza 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          }
        ]
      }

    return x;

  }


}
