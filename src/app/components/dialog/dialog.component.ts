import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OmdbApiService} from '../../services/omdb-api.service';
import {Movie} from '../../Models/Movies';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  movie:Movie;
  imdbID:string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private omdbServices:OmdbApiService,
    ) { }

  ngOnInit(): void {
    this.imdbID = this.data

    this.omdbServices.getMovieByID(this.imdbID).subscribe(movieInfo => {
      this.movie = movieInfo
    });

    this.checkWindowSize(window.innerWidth,this.dialogRef);
    window.addEventListener('resize',()=>{
      this.checkWindowSize(window.innerWidth,this.dialogRef);
    });

  }


  checkWindowSize(windowWidth:number, dialogRef: MatDialogRef<DialogComponent>){
    if(windowWidth > 1400){
      dialogRef.updateSize('50%');
    }else if(windowWidth > 1200 && windowWidth){
      dialogRef.updateSize('60%');
    }else{
      dialogRef.updateSize('100%');
    }
  }



}
