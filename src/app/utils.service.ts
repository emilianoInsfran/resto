import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
	data:any;
	//pedido
	agregarPlatos:string = '-';
	arrayPlatosPedidos=[];
	masPedido:boolean=false;
	idRestoChat:any;
	restoCliente:any;
	restoClienteCodigo:string;
	private header = new HttpHeaders({ 'content-type': 'application/json','Access-Control-Allow-Origin':'*' });
	constructor(private http: HttpClient) { }

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

	//service

	getConfig(url) {
		return this.http.get(url);
	}

	postConfig(url,obj) {
		console.log("url",url);
		console.log("obj",obj);
		return this.http.post<any>(url,obj);
	}

	putConfig(url,obj) {
		console.log("url",url);
		console.log("obj",obj);
		return this.http.put<any>(url,obj);
	}

	deleteConfig(url,data:any={}) {
		console.log("url",url);
		console.log("data",data);
		return this.http.delete(url,data );
	}

	urlDev(){
		//return 'http://localhost:3000/'; 
		return 'https://serviceresto.herokuapp.com/';
	}

	urlProd(){
		return 'https://serviceresto.herokuapp.com/';
	
	}


	//maspedidos

	getMasPedidos(){
		return this.masPedido;
	}

	setMasPedidos(data){
		this.masPedido = data;
	}

	
	//maspedidos restoCliente

	getIdResto(){
		console.log("utils2",this.idRestoChat);
		return this.idRestoChat;
	}

	setIdResto(data){
		this.idRestoChat = data;
		console.log("utils",this.idRestoChat);
	}

	//maspedidos restoCliente

	getIdRestoCliente(){
		return this.restoCliente;
	}

	setIdRestoCliente(data){
		this.restoCliente = data;
	}
	getIdRestoClienteCodigo(){
		return this.restoClienteCodigo;
	}

	setIdRestoClienteCodigo(data){
		this.restoClienteCodigo = data;
	}




}
