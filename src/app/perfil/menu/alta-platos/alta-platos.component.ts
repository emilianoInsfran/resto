import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from "../../../utils.service";
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-alta-platos',
  templateUrl: './alta-platos.component.html',
  styleUrls: ['./alta-platos.component.scss']
})
export class AltaPlatosComponent implements OnInit {
  altaPlatosForm = new FormGroup({
    nombrePlato: new FormControl('',Validators.required),
    descripcionPlato: new FormControl('',Validators.required),
    precioPlato: new FormControl('',Validators.required),
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
  constructor(private route:Router, public utils:UtilsService) { }

  ngOnInit(): void {
  }

  //mostrar list platos 

  goback(page){
    this.goBack.emit(page)
  }

  agregarPlato(){
    console.log('=>',this.altaPlatosForm.value);

  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.utils.setData(codigo);
    this.route.navigate([`${page}`])
  }

  upload(){
    document.getElementById("myfile").click();
  }

}
