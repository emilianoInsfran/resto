import { Component, OnInit } from '@angular/core';
import { Font } from 'ngx-font-picker';
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
  font2:any
  headingCss = {
    'color':'red', 
    'font-weight':'bold'
  };

  private _presetFonts = ['Arial', 'Times', 'Courier', 'Lato', 'Open Sans', 'Roboto Slab'];

  public font: Font = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']
  });

  public sizeSelect: boolean = true;
  public styleSelect: boolean = true;

  public presetFonts = this._presetFonts;
  constructor() { }

  ngOnInit(): void {
  }

  
  public togglePresetFonts(): void {
    this.presetFonts = this.presetFonts.length ? [] : this._presetFonts;
  }

  public toggleExtraOptions(): void {
    this.sizeSelect = !this.sizeSelect;
    this.styleSelect = !this.styleSelect;
  }

  setFont(font){
    console.log("pasado por parametro",font);
    console.log("pasado por valiable",this.font);

  }

}
