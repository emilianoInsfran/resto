import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { SimpleModalService } from "ngx-simple-modal";
import { UtilsService } from "../../utils.service";

@Component({
  selector: 'app-qr-generate',
  templateUrl: './qr-generate.component.html',
  styleUrls: ['./qr-generate.component.scss']
})
export class QrGenerateComponent implements OnInit {
  cantidadMesas:number;
  arrayQRData:any=[];
  showGenerarPrimerasMesas: boolean = true;
  constructor(private simpleModalService:SimpleModalService,public utils:UtilsService) { }

  ngOnInit(): void {
    this.getQR();
  }

  getQR(){
    let id = 111//userid
    this.utils.getConfig(this.utils.urlDev()+'qr/'+id)
      .subscribe((data) => {
        //this.showLoading = false;
        console.log("qr->",data);

        this.getArrayPlatos(data);
      });
  }

  getArrayPlatos(data){
    if(data.qr.length != 0){
      this.showGenerarPrimerasMesas =false;
      this.arrayQRData = data.qr;
    }
   
  }

  addMesa(){
    let codigoResto= this.arrayQRData[this.arrayQRData.length-1].split('.')[0];
    let codigoMesa= Number (this.arrayQRData[this.arrayQRData.length-1].split('.')[1])+1;
    let mesa = Number (this.arrayQRData[this.arrayQRData.length-1].split('.')[2])+1;

    this.arrayQRData.push(codigoResto.toString() + '.' + codigoMesa.toString() + '.' + mesa.toString())
  }

  addQR(){
    let codigoResto= 111;

    for (let index = 0; index < this.cantidadMesas; index++) {

      let codigoMesa= 100+index;
      let mesa = index;

      this.arrayQRData.push(codigoResto.toString() + '.' + codigoMesa.toString() + '.' + mesa.toString())
    }
    this.showGenerarPrimerasMesas = false;

    console.log("QR", this.arrayQRData);

    let formData = new FormData();

    formData.append('id_admin',codigoResto.toString() );
    formData.append('qrArray',this.arrayQRData);

    this.utils.postConfig(this.utils.urlDev()+'qr',formData)
      .subscribe(
        (data) => {
          console.log("data->",data);
          //this.showLoading =false;
          this.showConfirm('Se generaron correctamente :)');
          this.getQR();
        },
        err =>{
          console.log("ERROR",err);
          alert(err);
        }

      );

  }

    //elminar categoria
  eliminarCategoria(data) {
      let disposable = this.simpleModalService.addModal(PopupComponent, {
        title: 'ELIMINAR',
        message: '¿Seguro que desea eliminar la mesa '+data.qr.split('.')[2]+'?',
        opciones:'eliminar'
      })
      .subscribe((isConfirmed)=>{
          //We get modal result
          console.log('-',isConfirmed);
          if(isConfirmed) {
            console.log("data")
            this.popupDelete(data._id);
          }
          else {
              //alert('declined');
          }
      });
      //We can close modal calling disposable.unsubscribe();
      //If modal was not closed manually close it by timeout
    }

    popupDelete(id){
    
      this.utils.deleteConfig(this.utils.urlDev()+'qr/'+id)
        .subscribe(
          (data) => {
            console.log("data->",data);
            this.showConfirm("Se elimino correctamente!")
            this.getQR();
          },
          err =>{
            console.log("ERROR",err);
            alert(err);
          }
  
        );
    }


    //popup
    showConfirm(message?) {
      let disposable = this.simpleModalService.addModal(PopupComponent, {
        title: 'Confirm title',
        message: message,
        opciones:'confirmacion',
      })
      .subscribe((isConfirmed)=>{
          //We get modal result
          console.log('-',isConfirmed);
          if(isConfirmed) {
              //this.gotoPage('','perfil');
          }
          else {
              alert('declined');
          }
      });
      //We can close modal calling disposable.unsubscribe();
      //If modal was not closed manually close it by timeout
      setTimeout(()=>{
          disposable.unsubscribe();
          //this.gotoPage('','listaplatos');
  
      },2000);
    }

}
