import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Characters } from '../../models/character';
import { Info } from 'src/app/models/info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public characters : Characters[] = [];
  public info: Info;
  public number: number = 1;
  constructor( private _data : DataService ) { }

  ngOnInit(): void {
    this._data.getData().subscribe( res => {
      this.characters = res.data; this.info = res.info;
    });
    this._data.page$.subscribe( (page:number) => { 
      this._data.getData(page).subscribe( res => {
        this.characters = res.data; this.info = res.info; 
      });
    });
  }

  pagePrev(): void {
    if(this.number === 1) return; 
    this._data.page$.emit( this.number -= 1 );
  }

  pageNext(): void {
    if(this.number === 30) return;
    this._data.page$.emit( this.number += 1 );
  }

}
