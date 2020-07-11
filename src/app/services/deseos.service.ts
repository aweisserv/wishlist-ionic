import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
    
    console.log("Servicio inicializado");

    this.cargarStorage();

  /*  Listas demo
      const lista1 = new Lista('Compra de carnes');
      const lista2 = new Lista('Compra de suplementos');
      this.listas.push(lista1, lista2);
  */

   }

   crearLista( titulo: string ) {

    const nuevaLista = new Lista(titulo);
    this.listas.push( nuevaLista );
    this.guardarStorage();

    return nuevaLista.id;

   }
   

   obtenerLista( id: string | number ) {

    id = Number(id);

    return this.listas.find( listaData => listaData.id === id );

   }


   guardarStorage() {   // Guardado de datos en local storage

    localStorage.setItem('data', JSON.stringify( this.listas) );    

   }


   cargarStorage() {    // Validación para cargar datos del local storage en caso de que existan
     
    if ( localStorage.getItem('data') ) {     
      this.listas = JSON.parse( localStorage.getItem('data') );
    }

   }


}
