import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

private apiKey: string= 'Bd5XyjwbWp8zoE6fCv6vZX0eupHxpOeH';

private servicioUrl = 'http://api.giphy.com/v1/gifs'

 private _historial:string[]=[];

 public resultado: Gif[]=[];

 get historial(){
   return [...this._historial];
 }

 constructor( private http: HttpClient){
   //muestro el historial de busqueda
   if(localStorage.getItem('historial')){
     this._historial = JSON.parse(localStorage.getItem('historial')!);
   }
  //  this._historial = JSON.parse(localStorage.getItem('historial')!) || [])

  //aqui muestro los gifs que tengo en el historial
   this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];

 }

 buscarGisf(query:string){
  query = query.trim().toLowerCase();
  //para que no se repitan sino lo incluye lo inserto
   if(!this._historial.includes(query)){ 
    this._historial.unshift(query);
   }
   this._historial = this._historial.splice(0,10); //para manter solo 10
   //guardo la busqueda del gifs
   localStorage.setItem('historial', JSON.stringify(this._historial));
   
   console.log(this._historial)

   const params = new HttpParams()
   .set('api_key', this.apiKey)
   .set('limit','10')
   .set('q', query);


   this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params })
    .subscribe( (resp )=>{
      this.resultado=resp.data ;
      //manter las imagen de busqueda aqui lo guardo en el localStorage
      localStorage.setItem('resultado', JSON.stringify(this.resultado));
    })
 }
}
