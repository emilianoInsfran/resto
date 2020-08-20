import { Component, OnInit } from '@angular/core';
import { UtilsService } from "../../../utils.service";
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-lista-platos',
  templateUrl: './lista-platos.component.html',
  styleUrls: ['./lista-platos.component.scss']
})
export class ListaPlatosComponent implements OnInit {
  getPlatosData:any;
  constructor(private route:Router, public utils:UtilsService) { 
    this.getPlatosData = this.getPlatos() ;
  }

  ngOnInit(): void {
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
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
