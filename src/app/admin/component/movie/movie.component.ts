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

  async ngOnInit() {
    await this.movieService.getMovie().toPromise().then(
      value => {
        this.movies = value;
      }
    );
    console.log(this.movies);
  }

  onCreate() {
    const dialogRef = this.matDialog.open(AddMovieComponent);
    dialogRef.afterClosed().subscribe((value: any) => {
      if (value) {
        console.log(value);
        this.movies = value;
      }
    });
  }

  updateAfterDelete($event) {
    let id;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id === $event.id) {
        id = i;
      }
    }
    this.movies.splice(id, 1);
  }
}
