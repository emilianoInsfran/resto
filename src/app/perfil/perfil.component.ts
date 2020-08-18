import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  showPerfil:boolean =true;
  constructor(private route:Router) { }

  ngOnInit(): void {
    
  }

  upload(){
    document.getElementById("myfile").click();
  }

  seccionTab(){
    this.showPerfil = false;
  }

  seccionPerfil(){
    this.showPerfil = true;
  }
  
  gotoPage(codigo,page){
    console.log(codigo);
    this.route.navigate([`${page}`])
  }

}
