import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";
import { UtilsService } from "../utils.service";

export interface ConfirmModel {
  title:string;
  message:string;
  opciones: string;

}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})



export class PopupComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  opciones: string;
  categoria:string;
  nombreCliente:string;
  tokenPedido:string;
  constructor( private utils:UtilsService) {
    super();
  }
  confirm(data) {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.utils.setData({categoria:data})
    this.result = true;
    this.close();
  }

  token(nombre,token){
    this.utils.setData({nombre:nombre,token:token})
    this.result = true;
    this.close();
  }
}
