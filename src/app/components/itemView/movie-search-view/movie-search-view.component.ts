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
    this.organizeButtonPress(e);
  }

  organizeButtonPress(e:any){
    //Next buttons for carousel scroll
    let nextMovies:HTMLElement = document.querySelector('.nextMovies');
    let nextSeries:HTMLElement = document.querySelector('.nextSeries');
    let nextGames:HTMLElement = document.querySelector('.nextGames');

    //Prev buttons for carousel scroll
    let prevMovies:HTMLElement = document.querySelector('.prevMovies');
    let prevSeries:HTMLElement = document.querySelector('.prevSeries');
    let prevGames:HTMLElement = document.querySelector('.prevGames');

    //Track class for all carousel lists
    let trackMovies:HTMLElement = document.getElementById('movies');
    let trackSeries:HTMLElement = document.getElementById('series');
    let trackGames:HTMLElement = document.getElementById('games');
    
    if(e.className.includes('next')){
      if(e.id === 'movies'){
        this.indexMovies++;
        this.carouselButtonFunction(e.className,this.indexMovies,nextMovies,trackMovies,prevMovies);
      }
      if(e.id === 'series'){
        this.indexSeries++;
        this.carouselButtonFunction(e.className,this.indexSeries,nextSeries,trackSeries,prevSeries);
      }
      if(e.id === 'games'){
        this.indexGames++;
        this.carouselButtonFunction(e.className,this.indexGames,nextGames,trackGames,prevGames);
      }
    }

    if(e.className.includes('prev')){
      if(e.id === 'movies'){
        this.indexMovies--;
        this.carouselButtonFunction(e.className,this.indexMovies,nextMovies,trackMovies,prevMovies);
      }
      if(e.id === 'series'){
        this.indexSeries--;
        this.carouselButtonFunction(e.className,this.indexSeries,nextSeries,trackSeries,prevSeries);
      }
      if(e.id === 'games'){
        this.indexGames--;
        this.carouselButtonFunction(e.className,this.indexGames,nextGames,trackGames,prevGames);
      } 
    }
  }

  carouselButtonFunction(type:string, index:number, next:HTMLElement,
    track:HTMLElement, prev:HTMLElement){
      let carouselWidth = (document.querySelector('.carousel-container') as HTMLElement).offsetWidth;
      
      //console.log((index * carouselWidth) > track.offsetWidth);
      
      if(type.includes('next')){ 
        if(track.offsetWidth > carouselWidth){
          prev.classList.add('show');
        }      
        if((index * carouselWidth) > (track.offsetWidth - carouselWidth)){
          track.style.transform = `translateX(-${track.offsetWidth - carouselWidth}px)`;        
          next.classList.add('hide');
        }else{
          track.style.transform = `translateX(-${index * carouselWidth}px)`;        
        }
      }

    if(type.includes('prev')){
      next.classList.remove('hide');
      this.indexGames--;
      track.style.transform = `translateX(-${index * carouselWidth}px)`;
      if(index === 0){
        prev.classList.remove('show');
      }
    }
  }




  
  getOneType(type:string){
    return this.searchResult.Search?.filter(s => s.Type === type);
  }

  ifSeriesExist(type:string):boolean{
    let value = this.searchResult.Search?.filter(s => s.Type === type);
    let t:string;
    
    value?.map(s => {
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
