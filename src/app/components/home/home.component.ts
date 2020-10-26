import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {OmdbApiService} from '../../services/omdb-api.service';
import {SearchResult} from '../../Models/Search';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieSearchForm:FormGroup;

  searches:SearchResult;

  constructor(private omdServices:OmdbApiService, private fb:FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {

    //this.searchAPI('futurama');

/*     this.movieSearchForm = this.fb.group({
      searchText:''
    });

    this.movieSearchForm.valueChanges.subscribe(() => {
      let c = this.movieSearchForm.get('searchText').value;
      
      this.searchAPI(c);
      
    }); */

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "tt1825683";

    let dialogRef = this.dialog.open(DialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    })
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
