import { Component, OnInit } from '@angular/core';
import {OmdbApiService} from '../../services/omdb-api.service';
import {Movie} from '../../Models/movies';
import {SearchResult} from '../../Models/Search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies:Movie[];
  searches:SearchResult;

  constructor(private omdServices:OmdbApiService) { }

  ngOnInit(): void {
    this.omdServices.searchMovies().subscribe(search => {
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
