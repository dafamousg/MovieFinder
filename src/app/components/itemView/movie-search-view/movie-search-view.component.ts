import { Component, Input, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import {OmdbApiService} from 'src/app/services/omdb-api.service';
import {SearchResult} from 'src/app/Models/Search';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-movie-search-view',
  templateUrl: './movie-search-view.component.html',
  styleUrls: ['./movie-search-view.component.scss']
})
export class MovieSearchViewComponent implements OnInit {

  @Input() searchResult:SearchResult;
  @ViewChild('trackMovies') trackMovies:ElementRef;
  @ViewChild('trackSeries') trackSeries:ElementRef;
  @ViewChild('trackGames') trackGames:ElementRef;
  indexMovies:number = 0;
  indexSeries:number = 0;
  indexGames:number = 0;
  trackMoviesWidth:number;
  trackSeriesWidth:number;
  trackGamesWidth:number;
  id:any;
  
  
  constructor(private omdbApi:OmdbApiService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
  }
  
  async ngDoCheck(){
    //await this.sleep(500);
    
    if(this.trackMovies?.nativeElement.offsetWidth && this.trackMovies.nativeElement.offsetWidth !== this.trackMoviesWidth){
      this.indexMovies = 0;
      this.trackMoviesWidth = this.trackMovies.nativeElement.offsetWidth;
      this.checkSizeOfTrack('movies');
    }
    if(this.trackSeries?.nativeElement.offsetWidth && this.trackSeries.nativeElement.offsetWidth !== this.trackSeriesWidth){
      this.indexSeries = 0;
      this.trackSeriesWidth = this.trackSeries.nativeElement.offsetWidth;
      this.checkSizeOfTrack('series');
    }
    if(this.trackGames?.nativeElement.offsetWidth && this.trackGames.nativeElement.offsetWidth !== this.trackGamesWidth){
      this.indexGames = 0;
      this.trackGamesWidth = this.trackGames.nativeElement.offsetWidth;
      this.checkSizeOfTrack('games');
    }
    if(!this.trackSeries?.nativeElement.offsetWidth && !this.trackMovies?.nativeElement.offsetWidth && !this.trackGames?.nativeElement.offsetWidth){
      this.indexMovies = 0;
      this.indexSeries = 0;
      this.indexGames = 0;
      
    }
  }

  sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openDialog(imdbID:string){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = imdbID;

    let dialogRef = this.dialog.open(DialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    })

    
  }

  checkSizeOfTrack(type:string){
    

    let trackMovies:HTMLElement = document.getElementById('movies');
    let trackSeries:HTMLElement = document.getElementById('series');
    let trackGames:HTMLElement = document.getElementById('games');
    
    //Next buttons for carousel scroll
    let nextMovies:HTMLElement = document.querySelector('.nextMovies');
    let nextSeries:HTMLElement = document.querySelector('.nextSeries');
    let nextGames:HTMLElement = document.querySelector('.nextGames');

    switch(type){
      case trackMovies?.id:
        this.hideOrShowNextButton(trackMovies,nextMovies);
        break;
      case trackSeries?.id:
        this.hideOrShowNextButton(trackSeries,nextSeries);
        break;
      case trackGames?.id:
        this.hideOrShowNextButton(trackGames,nextGames);
        break;
      default:
        break;
    }
  }

  hideOrShowNextButton(track:HTMLElement, next:HTMLElement, carouselWidth:number = this.getCarouselWidth()){
    if(track?.offsetWidth < carouselWidth){
      next.classList.add('hide');
    }
    else{
      next.classList.remove('hide');
    }
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
          track.style.transform = `translateX(-${track.offsetWidth - carouselWidth+10}px)`;        
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

  ifTypeExist(type:string):boolean{
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

  getCarouselWidth(){
    return (document.querySelector('.carousel-container') as HTMLElement)?.offsetWidth;
  }

}
