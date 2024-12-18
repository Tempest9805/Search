import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'U9uyWwp0uR1FRbnRK5Ot1S25Ax06Hq6U'

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikey: string = GIPHY_API_KEY;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  
  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(){
    if ( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse (localStorage.getItem('history')! );
    if (this._tagsHistory.length === 0) return;
    this.searchTag( this.tagsHistory[0])
  }

  searchTag( tag: string ):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)
    
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag)

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=U9uyWwp0uR1FRbnRK5Ot1S25Ax06Hq6U&q=Valorant&limit=100')
    // .then(resp => resp.json())
    // .then(data => console.log(data))

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
      .subscribe( resp =>{
        
        this.gifList = resp.data;

      });
  }

}
