import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html'
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertController: AlertController ) { }

  ngOnInit() {}

  
  listaSeleccionada( lista: Lista ) {

    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
    
  }

  borrarLista( lista: Lista ) {

    this.deseosService.borrarLista( lista );

  }

  async editarLista( lista: Lista ) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text:'Actualizar',
          handler: ( data ) => {
            console.log( data );
            if ( data.titulo.lenght === 0) {  // Si el título es vacío, entonces no hace nada
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();

  }

}
