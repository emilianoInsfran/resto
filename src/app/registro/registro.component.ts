import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { PopupComponent } from '../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  changeText:boolean;

  registro:any={
    razonSocial:'',
    direccion:'',
    telefono:null,
    email:'',
    nombre:'',
    pass:'',
    repetirPass:''
  }

  messagePasword:string='La contraseña es obligatoria'
  validatePass:boolean=false;

  profileForm = new FormGroup({
    razonSocial: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    nombre: new FormControl('',Validators.required),

  });

  constructor(private route:Router,private simpleModalService:SimpleModalService,public utils:UtilsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value

    if(this.registro.pass == '' || this.registro.pass == undefined || this.registro.repetirPass == '' || this.registro.repetirPass == undefined) {
      this.validatePass =true;
      return;
    }
    else this.validatePass = false;

    if(this.registro.pass != this.registro.repetirPass) {
      this.validatePass =true;
      this.messagePasword = 'Las contraseñas no coinciden'
      return;
    }else{
      this.validatePass =false;
      this.messagePasword = 'La contraseña es obligatoria'
    }

    console.log('pass=>',this.registro.pass);
    console.log('repetirPass=>', this.registro.repetirPass);
    console.log('=>',this.profileForm.value);

    let obj  = {
      id_admin:this.randomizeInteger(100, 999),
      nombre: this.profileForm.value.nombre,
      razon_social:this.profileForm.value.razonSocial ,
      direccion:this.profileForm.value.direccion ,
      telefono:this.profileForm.value.telefono ,
      email: this.profileForm.value.email,  
      password: this.registro.pass,
    }

    this.postResto(obj);

  }

  randomizeInteger(min, max) {
  	if(max == null) {
    	max = (min == null ? Number.MAX_SAFE_INTEGER : min);
      	min = 0;
    }

    min = Math.ceil(min);  // inclusive min
    max = Math.floor(max); // exclusive max

  	if(min > max - 1) {
    	throw new Error("Incorrect arguments.");
    }

    return min + Math.floor((max - min + 1) * Math.random());
  }



  postResto(obj) {
    //this.showLoading =true;
    console.log("formData",obj);
  
    this.utils.postConfig(this.utils.urlDev()+'resto',obj)
        .subscribe(
          (data) => {
            console.log("data registro->",data);

            this.showConfirm();
          },
          err =>{
            console.log("ERROR",err);
            alert(err);
          }
    );
  }

  showConfirm() {
    let disposable = this.simpleModalService.addModal(PopupComponent, {
      title: 'Confirm title',
      message: 'Se registro con exito! :)',
      opciones:'confirmacion',
    })
    .subscribe((isConfirmed)=>{
        //We get modal result
        console.log('-',isConfirmed);
        if(isConfirmed) {
            this.gotoPage('','perfil');
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
  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }

}
