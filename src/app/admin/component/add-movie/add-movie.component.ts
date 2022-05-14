import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieService} from '../../../../service/movie.service';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {MovieGenre} from '../../../../model/MovieGenre';
import {MovieGenreService} from '../../../../service/movie-genre.service';
import {MatDialog} from "@angular/material/dialog";
import {AddGenreMovieComponent} from "../add-genre-movie/add-genre-movie.component";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class AddMovieComponent implements OnInit {
  movieStatus = [{id: '1', name: 'Shown'}, {id: '0', name: 'Not shown yet'}];
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  maxDate: Date;
  hours = 0;
  minutes = 0;
  second = 0;
  selectedValue: any;
  movieGenre = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  genreList: MovieGenre[] = [];
  genreListSelected: number[] = [];

  constructor(private movieService: MovieService,
              private movieGenreService: MovieGenreService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 13);
    this.movieService.formMovie.reset();
    this.movieService.initializeFormGroup();
    this.movieGenreService.getGenre().subscribe(data => {
      this.genreList = data;
    });

  }

  eventChangeSecond(target: number) {
    if (target >= 60) {
      const mod = Math.floor(target / 60);
      this.second = target - mod * 60;
      this.minutes = this.minutes + mod;
    }
    if (this.minutes >= 60) {
      const modMN = Math.floor(this.minutes / 60);
      this.minutes = this.minutes - modMN * 60;
      this.hours = this.hours + modMN;
    }
  }

  eventChangeMinutes(target: number) {
    if (target >= 60) {
      const modHour = Math.floor(target / 60);
      this.minutes = target - modHour * 60;
      this.hours = this.hours + modHour;
    }
  }

  removeGenre(id: any) {
    const index = this.movieGenre.value as number[];
    this.removeFirst(index, id);
    this.movieGenre.setValue(index); // To trigger change detection
  }

  removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onCreateGenre() {
    const dialogRef = this.matDialog.open(AddGenreMovieComponent, {
      data: this.genreList
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.genreList = result;
    });
  }
}
