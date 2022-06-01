import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MovieCastService} from '../../../../service/movie-cast.service';
import {MovieCast} from '../../../../model/MovieCast';

@Component({
  selector: 'app-list-cast-movie',
  templateUrl: './list-cast-movie.component.html',
  styleUrls: ['./list-cast-movie.component.css']
})
export class ListCastMovieComponent implements OnInit {
  searchText = '';
  movieCast = new FormControl();
  castList: MovieCast[] = [];

  constructor(private movieCastService: MovieCastService) {
  }

  ngOnInit() {
    this.movieCastService.getCast().subscribe((data: any) => {
      if (data) {
        this.castList = data;
      }
    });
    this.movieCast.valueChanges.subscribe((data: any) => {
      console.log(data);
    });
  }

  onNoClick() {
  }

  sendListCast() {
  }

  show() {
    if (this.searchText === '') {
      console.log('No search');
    } else {

      console.log(this.searchText);
    }
  }
  changeFormCast() {
    if (this.searchText === '') {
      console.log('No search');
    } else {

      console.log(this.searchText);
    }
  }
}
