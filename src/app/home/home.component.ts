import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any={
    codigo:null
  };
  changeText:boolean;
  constructor(private route:Router) {  }
  @Input() fieldvalue = '';

  ngOnInit(): void {

  }

  keyPress(event: KeyboardEvent) {
    console.log(event);


    if( event.toString().length >= 3 ) {
      this.user.codigo = parseInt(event.toString());
      this.gotoPage(this.user.codigo,'categoria')

    }else {
      console.log(true);
      //this.gotoPage(this.user)
      return true
    }

  }
  

  onInputChange(data){
    console.log('=>',data);
  }

  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }



}
