import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

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
  constructor(private route:Router) { }

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

      setTimeout(()=>{                           //<<<---using ()=> syntax
        this.setResetOpenCodigo();
      }, 5000);
      this.gotoPage('','categoria');

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
