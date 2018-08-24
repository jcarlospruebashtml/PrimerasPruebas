 // JavaScript Document

		/*PARA QUE ESTO FUNCIONE TENEMOS QUE HACERLO DESDE UN SERVIDOR REMOTO, O CAMBIAR LOS PERMISOS EN EL NAVEGADOR PARA QUE NOS PERMITA ACCEDER EN LOCAL*/


"use strict";
var zonadatos,boton,espacio_asignado;

function inicio(){
	zonadatos=document.getElementById("zonadatos");/*ERROR REFORMADO, "document.getElementById" por "addEventListener", descubierto gracias a la consola del navegador chrome*/
	boton=document.getElementById("boton");
	boton.addEventListener("click",crear,false);
	
	/*PRIMER PARAMETRO ES EL ESPACIO QUE VA A OCUPAR EL SISTEMA DE ARCHIVOS, MEDIDO EN BITES, LO QUEREMOS EN MEGAS, POR ESO PONEMOS 1024 AL CUADRADO.
	ESTA INSTRUCCION PIDE PERMISO AL NAVEGADOR PARA PODER CREAR UN ESPACIO EN DISCO */
	
	navigator.webkitPersistentStorage.requestQuota(5*1024*1024, acceso);
}
function acceso(){
	
	/*PARAMETROS DEL METODO "RequestFileSystem":
		1º El tipo de espacio donde vamos a crear el sistema de archivo= PERSISTENT O TEMPORARY;
		2º De nuevo el espacio que queremos reservar para el sistema de archivos;
		3º La llamada a una funcion en caso de que tengamos exito en la creacion del sistema de archivos;
		4º La llamada a una funcion en caso de que NO tengamos exito en la creacion del sistema de archivos;*/
	
	window.webkitRequestFileSystem(window.PERSISTENT, 5*1024*1024, crearsis, errores);
	/*Al crear un sistema de archivos con "RequestFileSysten" se lanza un objeto "fileSystem",que se crea cuando "ABRIMOS o CREAMOS" un sistema de archivos, el cual tiene que ser capturado por la funcion que usamos dentro de este metodo.
	Esta lo captura a modo de parametro;*/
}

/*ESTA FUNCION RECIBE COMO PARAMETRO EL OBJETO "fileSystem" QUE LANZA AL FORMAR PARTE DE "RequestFileSystem", al que vamos a llamar "sistema".*/

function crearsis(sistema){
	/*sistema hace referencia al objeto "fileSystem", que se crea cuando abrimos o creamos un sistema de archivos con "RequestFileSystem".*/
	espacio_asignado=sistema.root;
}
function crear(){
	var archivo=document.getElementById("entrada").value;
		if(archivo!==""){
			
			/*La diferencia de crear un archivo o un directorio estriba solamente en usar el metodo "getFile" o "getDirectory".*/
			
			  espacio_asignado.getFile(archivo, {create:true, exclusive:false},mostrarSiExito,errores);
			
		/*mostrarSiExito lanza un objeto, bueno en realidad el objeto se lanza al crear un archivo con "getFile" de forma parecida al anterior "RequestFileSysten" que nos creo nuestro sistema de archivos;*/
		}
}
function mostrarSiExito(entrada){
	/*"entrada" hace referencia al objeto lanzado al crear el archivo y es capturado a modo de parametro por la funcion que forma parte del metodo "getFile";*/
	document.getElementById("entrada").value="";	
	zonadatos.innerHTML="Espacio en disco y archivo creados correctamente!<br>";
	zonadatos.innerHTML+="Nombre: " + entrada.name + "<br>";
	zonadatos.innerHTML+="Ruta: " + entrada.fullPath + "<br>";
}
function errores(evento){
	/*Cuando se produce un error se lanza tambien un objeto que hay que capturar al que por convencion llamamos "e" o "evento";*/
	alert("Lo sentimos, la acción no se ha realizado correctamente. 'Código de error:'" + evento.code);
}


window.addEventListener("load",inicio,false);