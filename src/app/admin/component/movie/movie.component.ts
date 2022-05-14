import {Component, OnInit} from '@angular/core';
import {Movie} from '../../../../model/movie';
import {MovieService} from '../../../../service/movie.service';
import {AddMovieComponent} from '../add-movie/add-movie.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.movieService.getMovie().subscribe(
      (data: any) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.movieDetailDTOS.length; i++) {
          let movieChildren: Movie;
          movieChildren = new Movie(
            data.movieDetailDTOS[i].id,
            data.movieDetailDTOS[i].title,
            data.movieDetailDTOS[i].poster,
            data.movieDetailDTOS[i].detail,
            data.movieDetailDTOS[i].movieStatus,
            data.movieDetailDTOS[i].linkTrailer,
            data.movieDetailDTOS[i].linkMovie,
            data.movieDetailDTOS[i].releaseDate,
            data.movieDetailDTOS[i].movieDuration,
            data.movieDetailDTOS[i].viewNumber
          );
          this.movies.push(movieChildren);
        }
        console.log(this.movies);
      }
    );
  }

  onCreate() {
    this.matDialog.open(AddMovieComponent);
  }
}
