import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UtilsService } from '../../app/utils.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  
  getPlatosData:any;
  categoriaSeleccionada:string='0';
  
  constructor(private route:Router, private utils:UtilsService  ) {
    this.getPlatosData = this.getPlatos() ;

   }

  ngOnInit() {
  }

  cambioCategoria(idCategoria){
    this.categoriaSeleccionada =idCategoria;
  }

  getPlatos(){
    let x=
    [
      {
        categoria:'Pizza',
        platos:[
          {
            id:1,
            nombre:'piza 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'piza 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          }
        ]
      },
      {
        categoria:'Empanada',
        platos:[
          {
            id:1,
            nombre:'empanada 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'empanada 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          }
        ]
      },
      {
        categoria:'Empanada',
        platos:[
          {
            id:1,
            nombre:'empanada 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'empanada 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          }
        ]
      },
      {
        categoria:'Empanada',
        platos:[
          {
            id:1,
            nombre:'empanada 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'empanada 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          }
        ]
      },
      {
        categoria:'Empanada',
        platos:[
          {
            id:1,
            nombre:'empanada 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:300,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'empanada 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          }
        ]
      },
      {
        categoria:'Empanada',
        platos:[
          {
            id:1,
            nombre:'empanada 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'empanada 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          }
        ]
      },
      {
        categoria:'Empanada',
        platos:[
          {
            id:1,
            nombre:'empanada 1 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          },
          {
            id:1,
            nombre:'empanada 2 napoliana',
            descripcion:'La pizza napolitana, de masa tierna y delgada pero bordes altos, es la versión propia de la cocina napolitana de la pizza redonda',
            img:'',
            precio:1000,
            iconos:['seliaco','vagano']
    
          }
        ]
      }


    ]

    return x;

  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

}
