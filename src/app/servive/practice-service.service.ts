import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PracticeServiceService {

  constructor(private http:HttpClient) { }

  firstapi(){
   return this.http.get('https://pokeapi.co/api/v2/berry-firmness/')
  }
  secondapi(){
    return this.http.get('https://rickandmortyapi.com/api/character/5')
  }
}
