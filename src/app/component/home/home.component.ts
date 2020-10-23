import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {OmdbApiService} from '../../services/omdb-api.service';
import {Movie} from '../../Models/movies';
import {SearchResult} from '../../Models/Search';
import { stringify } from 'querystring';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieSearchForm:FormGroup;

  movies:Movie[];
  searches:SearchResult;

  constructor(private omdServices:OmdbApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.movieSearchForm = this.fb.group({
      searchText:''
    });

    this.movieSearchForm.valueChanges.subscribe(() => {
      let c = this.movieSearchForm.get('searchText').value;

      this.searchAPI(c);
      
    });
  }

  searchAPI(searchText:string){
    this.omdServices.searchMovies(searchText).subscribe(search => {
      console.log(search);
      this.searches = search; 

    }, (error) => {
      console.log('error occured: ', error);

    });
  }

  buttonClicked(){
    var name=document.getElementById('searchText').nodeValue;
    console.log("I was pressed: ", name);
    
  }

}
