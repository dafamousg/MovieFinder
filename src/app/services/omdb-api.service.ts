import { ErrorHandler, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, ErrorObserver, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { SearchResult } from '../Models/Search';
import { Movie } from '../Models/movies';

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
  
  TitalString:string;

  constructor(private http:HttpClient) { }


  searchMovies(searchText:string):Observable<SearchResult>{
    const res = this.http.get<SearchResult>(`${this.SearchString + searchText + this.apiKey}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
      );
   
    return res;
    
  }

  private handleError(error:HttpErrorResponse){
    
    alert('Failed to get API');

    return throwError(error);
  }

}
