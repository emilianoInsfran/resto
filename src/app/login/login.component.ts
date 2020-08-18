import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  empresa:any={
    nombre:'',
    contrasenia:''
  }
  changeText:boolean;
  constructor(private route:Router) { }

  ngOnInit(): void {}

  login(){
    this.gotoPage('','perfil');
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }


}
