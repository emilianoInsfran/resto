import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
  }

  //mostrar list platos 

  goback(page){
    this.goBack.emit(page)
  }

  agregarPlato(){
    console.log('=>',this.altaPlatosForm.value);

  }


  upload(){
    document.getElementById("myfile").click();
  }

}
