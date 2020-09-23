import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any={
    codigo:null
  };
  cookies:boolean=false;
  changeText:boolean;
  boxCookies:boolean =true;
  messageErroLogin:boolean=false;
  loading:boolean=false;
  constructor(private route:Router,public utils:UtilsService) {  }
  @Input() fieldvalue = '';

  ngOnInit() {
    this.utils.setTypeLogin(false);
  }

  keyPress(event: KeyboardEvent) {
    console.log(event);

    if( event.toString().length >= 3 ) {
      this.user.codigo = parseInt(event.toString());
      this.getUser(this.user.codigo)

    }else {
      console.log(true);
      //this.gotoPage(this.user)
      return true
    }
  }

  getUser(data){
    this.loading=true;
    console.log("estoy en login GET",data);//_id que te genera mongo
    this.utils.setIdRestoClienteCodigo(data);
    this.utils.getConfig(this.utils.urlDev()+'loginqr/'+data)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);
        this.loading=false;
        this.action(data);
      },
      error=>{
        this.loading=false;
        this.action(error.error);
      });
  }


  action(data){
    console.log(data);
    if(data.ok){
      this.utils.setIdRestoCliente(data.resto)
      this.utils.setIdResto(data)
      this.messageErroLogin = true;
      this.utils.setTypeLogin(true);
      this.gotoPage('','categoria');
    }else{
      this.messageErroLogin = true;
    }
  }
  
  onInputChange(data){
    console.log('=>',data);
  }

  aceptarCookies(){
    this.cookies = true;
  }

  showCookies(){
    console.log("FOCUS!");
    this.boxCookies = false;
  }

  hideCookies(){
    console.log("BLUR!!");
    this.boxCookies = true;

  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }



}
