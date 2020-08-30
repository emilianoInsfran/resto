import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UtilsService } from '../../app/utils.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  
  getPlatosData:any =this.preArmadoObj();
  categoriaSeleccionada:string='0';

  arrayCategoria:any;
  firstGetCategoria:any;
  arrayPlato:any;
  setMenu=[
    {}
  ];
  
  constructor(private route:Router, public utils:UtilsService  ) {
    //this.getPlatosData = this.getPlatos2();
  }

  ngOnInit() {
    this.getCategorias();
    this.getPlatos();
  }

  cambioCategoria(idCategoria){
    this.categoriaSeleccionada =idCategoria;
  }

  //GET CATEGORIA

  getCategorias(){
    console.log("estoy en categorias GET");//_id que te genera mongo
    let id = 1//userid
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
  }

  //GET PLATOS

  getPlatos(){

    console.log("estoy en platos GET");//_id que te genera mongo
    let id = 1//userid
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
    
          }
        ]
      },
    ]

    return x;
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

}
