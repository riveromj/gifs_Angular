import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  get historial(){

    
    return this.gifsService.historial
  }

  constructor( private gifsService:GifsService){}

  //con este metodo puedo puscar lo gisf anteriores y mostrarlos 
  buscar(item:string){
    console.log(item);
    this.gifsService.buscarGisf(item);
   
  }

}
