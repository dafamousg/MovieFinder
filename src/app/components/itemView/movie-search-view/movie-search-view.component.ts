import { Component, Input, OnInit } from '@angular/core';
import {OmdbApiService} from 'src/app/services/omdb-api.service';
import {Search} from 'src/app/Models/Search';

@Component({
  selector: 'app-movie-search-view',
  templateUrl: './movie-search-view.component.html',
  styleUrls: ['./movie-search-view.component.scss']
})
export class MovieSearchViewComponent implements OnInit {

  @Input() search:Search;

  constructor(private omdbApi:OmdbApiService) { }

  ngOnInit(): void {    
  }

  setClasses() {
    let classes = {
      search:true
    }
    return classes;
  }

}
