import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {OmdbApiService} from '../../services/omdb-api.service';
import {SearchResult} from '../../Models/Search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searches:SearchResult;
  searchType:string;
  movieSearchForm:FormGroup;
  myControl = new FormControl();
  Type: string[] = ['Any', 'Movie', 'Series', 'Game'];

  constructor(private omdServices:OmdbApiService, private fb:FormBuilder) { }

  ngOnInit(): void {

    //this.searchAPI('futurama');

    this.movieSearchForm = this.fb.group({
      searchText:'',
      searchType:'any'
    });
    
    
    this.movieSearchForm.valueChanges.subscribe(() => {
      let c = this.movieSearchForm.get('searchText').value;
      let type:string = this.movieSearchForm.get('searchType').value;

      if(type === undefined || type?.toLowerCase() === 'any'){
        this.searchAPI(c);
      }else if(!c){

      }
      else{
        let typeAttribute = type+"&"
        this.searchAPI(c, typeAttribute);
      }
      
      
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

  searchAPI(searchText:string, searchType:string = undefined){
    this.omdServices.searchMovies(searchText, searchType).subscribe(search => {
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
