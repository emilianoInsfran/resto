import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  qrResultString: string;
  openCodigo:boolean=true;
  message:string='Tiempo de espera para volver a escaner: 5 segundos ';
  showMessage:boolean=false;
  messageErroLogin:boolean=false;
  constructor(private route:Router,private utils:UtilsService) { }

  ngOnInit(): void {
  }

  
  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    console.log("top open codigo",this.openCodigo);
    if(this.openCodigo){
      //window.open(resultString, "_blank");
      this.qrResultString = resultString;
      this.openCodigo=false;
      this.showMessage=true;

      if(this.qrResultString){
        this.getUser(this.qrResultString);
      }

      setTimeout(()=>{                           //<<<---using ()=> syntax
        this.setResetOpenCodigo();
      }, 5000);

    }
  }


  getUser(data){
    console.log("estoy en login GET",data);//_id que te genera mongo
    this.utils.setIdRestoClienteCodigo(data);
    this.utils.getConfig(this.utils.urlDev()+'loginqr/'+data.split('.')[0])
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("data->",data);

        this.action(data);
      },
      error=>{
        this.action(error.error);
      });
  }


  action(data){
    console.log(data);
    if(data.ok){
      this.utils.setIdRestoCliente(data.resto)
      this.utils.setIdResto(data)
      this.messageErroLogin = false;
      this.gotoPage('','categoria');
    }else{
      this.messageErroLogin = true;
    }
  }

  setResetOpenCodigo(){
    console.log("se llamo denuevo a open codigo!!!!!");

    this.openCodigo=true;

  }


  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }

}
