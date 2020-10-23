import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addactormovie',
  templateUrl: './addactormovie.component.html',
  styleUrls: ['./addactormovie.component.css']
})
export class AddactormovieComponent implements OnInit {

  public actorsDB: any[] = [];
  public moviesDB: any[] = [];

  title: string = "";
  fullName: string = "";



  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  } 

  onAddActor() {
    const obj = {title: this.title, name: this.fullName};
    console.log(obj);
    
    this.dbService.addActor(obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }

}
