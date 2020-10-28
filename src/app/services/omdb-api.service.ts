import { ErrorHandler, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, ErrorObserver, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { SearchResult } from '../Models/Search';
import { Movie } from '../Models/Movies';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  urlApi:string = "http://www.omdbapi.com/?";
  searchString:string = "s=";
  idSearch:string = "i=";
  type:string = "&type=";
  testString:string = "futurama";

  constructor(private http:HttpClient) { }


  searchMovies(searchText:string, searchType:string = undefined):Observable<SearchResult>{
    let res:any;
    
    if(searchType){
      res = this.http.get<SearchResult>(`${this.urlApi + this.searchString + searchText +  this.type + searchType + this.apiKey}`)
    }else{
      res = this.http.get<SearchResult>(`${this.urlApi + this.searchString + searchText + this.apiKey}`)
    }

    res.pipe( retry(3), catchError(this.handleError));

    return res;
  }

  getMovieByID(imdbID:string):Observable<Movie>{
    const res = this.http.get<Movie>(`${this.urlApi + this.idSearch + imdbID + this.apiKey}`)
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
