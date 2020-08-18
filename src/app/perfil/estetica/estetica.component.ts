import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estetica',
  templateUrl: './estetica.component.html',
  styleUrls: ['./estetica.component.scss']
})
export class EsteticaComponent implements OnInit {
  color:any;
  fondo:any;
  botonesTxt:any;
  botonesFondo:any;
  botonesBorde:any;
  font:any
  headingCss = {
    'color':'red', 
    'font-weight':'bold'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
