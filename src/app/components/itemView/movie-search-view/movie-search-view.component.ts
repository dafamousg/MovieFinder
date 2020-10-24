import { Component, Input, OnInit, HostListener } from '@angular/core';
import {OmdbApiService} from 'src/app/services/omdb-api.service';
import {SearchResult} from 'src/app/Models/Search';

@Component({
  selector: 'app-movie-search-view',
  templateUrl: './movie-search-view.component.html',
  styleUrls: ['./movie-search-view.component.scss']
})
export class MovieSearchViewComponent implements OnInit {

  @Input() searchResult:SearchResult;
  indexMovies:number = 0;
  indexSeries:number = 0;
  indexGames:number = 0;
  
  
  constructor(private omdbApi:OmdbApiService) { }
  
  ngOnInit(): void {    
  }
  
  @HostListener('click',['$event.target']) onClick(e){
    let carouselWidth = (document.querySelector('.carousel-container') as HTMLElement).offsetWidth;

    
    let nextMovies:HTMLElement = document.querySelector('.nextMovies');
    let nextSeries:HTMLElement = document.querySelector('.nextSeries');
    let nextGames:HTMLElement = document.querySelector('.nextGames');
    let prevMovies:HTMLElement = document.querySelector('.prevMovies');
    let prevSeries:HTMLElement = document.querySelector('.prevSeries');
    let prevGames:HTMLElement = document.querySelector('.prevGames');


    let trackMovies:HTMLElement = document.getElementById('movies');
    let trackSeries:HTMLElement = document.getElementById('series');
    let trackGames:HTMLElement = document.getElementById('games');
    
    if(e.className.includes('next')){
      if(e.id === 'movies'){
        console.log(e.className);
                
        prevMovies.classList.add('show');
        this.indexMovies++;
        trackMovies.style.transform = `translateX(-${this.indexMovies * carouselWidth}px)`;
        if(trackMovies.offsetWidth - (this.indexMovies * carouselWidth) < carouselWidth){
          nextMovies.classList.add('hide');
        }

      }
      if(e.id === 'series'){
        console.log('series');
        
        prevSeries.classList.add('show');
        this.indexSeries++;
        trackSeries.style.transform = `translateX(-${this.indexSeries * carouselWidth}px)`;
        if(trackSeries.offsetWidth - (this.indexSeries * carouselWidth) < carouselWidth){
          nextSeries.classList.add('hide');
        }
      }
      if(e.id === 'games'){
        console.log('games');
        
        prevGames.classList.add('show');
        this.indexGames++;
        trackGames.style.transform = `translateX(-${this.indexGames * carouselWidth}px)`;
        if(trackGames.offsetWidth - (this.indexGames * carouselWidth) < carouselWidth){
          nextGames.classList.add('hide');
        }
      }
    }

    if(e.className.includes('prev')){
      if(e.id === 'movies'){
        nextMovies.classList.remove('hide');
        this.indexMovies--;
        trackMovies.style.transform = `translateX(-${this.indexMovies * carouselWidth}px)`;
        if(this.indexMovies === 0){
          prevMovies.classList.remove('show');
        }
      }
      if(e.id === 'series'){
        nextSeries.classList.remove('hide');
        this.indexSeries--;
        trackSeries.style.transform = `translateX(-${this.indexSeries * carouselWidth}px)`;
        if(this.indexSeries === 0){
          prevSeries.classList.remove('show');
        }
      }
      if(e.id === 'games'){
        nextGames.classList.remove('hide');
        this.indexGames--;
        trackGames.style.transform = `translateX(-${this.indexGames * carouselWidth}px)`;
        if(this.indexGames === 0){
          prevGames.classList.remove('show');
        }
      }
      
    }
    
  }

  doSomething(s:any){
    console.log(s);
    
  }



  
  getOneType(type:string){
    return this.searchResult.Search?.filter(s => s.Type === type);
  }

  ifSeriesExist(type:string):boolean{
    let value = this.searchResult.Search?.filter(s => s.Type === type);
    let t:string;
    
    value.map(s => {
      t = s.Type;
    });
    
    if(t === type){
      return true;
    }

    return false;
  }

  setClasses() {
    let classes = {
      searchResult:true
    }
    return classes;
  }

}
