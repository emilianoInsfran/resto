import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  empresa:any={
    nombre:'',
    pass:''
  }
  messageErroLogin:boolean = false;
  changeText:boolean;
  showLoading:boolean=false;
  constructor(private route:Router,public utils:UtilsService) { }

  ngOnInit(): void {}

  //GET resto

  login(){
    console.log("estoy en login GET",this.empresa);//_id que te genera mongo
    this.showLoading = true;
    this.utils.getConfig(this.utils.urlDev()+'login/'+this.empresa.nombre+'/'+this.empresa.pass)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.showLoading = false;
        this.action(data);
        // this.gotoPage('','perfil');
      },
      error=>{
        this.showLoading = false;
        this.action(error.error);
      });
  }


  action(data) {
    console.log(data)
    if(data.ok){
      this.utils.setIdResto(data)
      this.messageErroLogin = false;
      this.gotoPage('','tomarPedidos');
    }else{
      this.messageErroLogin = true;
    }
  }
  



  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }

  showCookies(){
    
  }


}
