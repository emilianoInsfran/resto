import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
	data:any;
	//pedido
	agregarPlatos:string = '-';
	arrayPlatosPedidos=[];
	constructor() { }

	setData(data){
		this.data = data;
	}

	getData(){
		return this.data;
	}

	//pedidos
	setMessageTotal(data){
		this.agregarPlatos = data;
	}

	getMessageTotal(){
		return this.agregarPlatos;
	}

	setPlatosPedidos(data){
		this.arrayPlatosPedidos.push(data);
	}

	eliminarPlato(data,id){
		this.arrayPlatosPedidos.splice(this.arrayPlatosPedidos.indexOf(data),id);
	}

	resetArrayPedido(){
		this.arrayPlatosPedidos = [];
	}

	getPlatosPedidos(){
		return this.arrayPlatosPedidos;
	}

}
