import { Injectable } from '@angular/core';

const GIPHY_API_KEY = 'U9uyWwp0uR1FRbnRK5Ot1S25Ax06Hq6U'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apikey: string = GIPHY_API_KEY;

  constructor() { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  
  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
    }

    this._tagsHistory = this.tagsHistory.splice(0,10);
  }

  searchTag( tag: string ):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag)
    this._tagsHistory.unshift(tag);
    console.log(this.tagsHistory);
  }

}
