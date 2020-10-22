import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, concat} from 'rxjs';
import {map} from 'rxjs/operators';
import { Movie } from '../Models/movies';
import { SearchResult } from '../Models/Search';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  apiKey:string = "&apikey=3fa2abd3";
  SearchString:string = "http://www.omdbapi.com/?s=";
  testString:string = "futurama";

  constructor(private http:HttpClient) { }


  searchMovies():Observable<SearchResult>{
    
    const res = this.http.get<SearchResult>(`${this.SearchString + this.testString + this.apiKey}`);
   

    return res;
    
  }

}
