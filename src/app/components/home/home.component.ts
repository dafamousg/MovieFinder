import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {OmdbApiService} from '../../services/omdb-api.service';
import {SearchResult} from '../../Models/Search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieSearchForm:FormGroup;

  searches:SearchResult;

  constructor(private omdServices:OmdbApiService, private fb:FormBuilder) { }

  ngOnInit(): void {

    //this.searchAPI('futurama');

    this.movieSearchForm = this.fb.group({
      searchText:''
    });

    this.movieSearchForm.valueChanges.subscribe(() => {
      let c = this.movieSearchForm.get('searchText').value;
      
      this.searchAPI(c);
      
    });
  }

  //Gets Array of Movies/Series/Other based on typ string
  getOneType(type:string){
    return this.searches.Search?.filter(s => s.Type === type);
  }

  ifSeriesExist(type:string):boolean{
    let value = this.searches.Search?.filter(s => s.Type === type);
    let t:string;
    
    value.map(s => {
      t = s.Type;
    });
    
    if(t === type){
      return true;
    }

    return false;
  }

  searchAPI(searchText:string){
    this.omdServices.searchMovies(searchText).subscribe(search => {
      this.searches = search; 
    }, (error) => {
      //console.log('error occured: ', error);
    });
  }

  buttonClicked(){
    var name=document.getElementById('searchText').nodeValue;
    console.log("I was pressed: ", name);
  }

}
