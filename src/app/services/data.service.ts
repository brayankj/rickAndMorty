import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { resData } from '../models/resData';
import { Info } from '../models/info';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public page$ = new EventEmitter<number>();
  constructor( public _http : HttpClient ) { }

  getData( page : number = 1 ){
    let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    return this._http.get(url).pipe(map( (res:resData) => {
        let info : Info = res.info;
        let results = res.results;
        let data = results.map( resp => {
          let character  = {
            id: resp.id,
            name: resp.name,
            species: resp.species,
            status: resp.status,
            imagen: resp.image,
            gender: resp.gender,
            created: resp.created
          }
          return character;
        })
        return { info, data }
      }
    ));
  }

}
