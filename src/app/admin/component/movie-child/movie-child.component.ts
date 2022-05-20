import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Movie} from '../../../../model/movie';
import {MovieService} from "../../../../service/movie.service";

@Component({
  selector: 'app-movie-child',
  templateUrl: './movie-child.component.html',
  styleUrls: ['./movie-child.component.css']
})
export class MovieChildComponent implements OnInit {
  @Input() movie: Movie;
  @Output() deleteMovieEvent = new EventEmitter<Movie>();

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe((data: any) => {
      if (data) {
        this.deleteMovieEvent.emit(this.movie);
        alert('Movie deleted successfully');
      }
    });
  }
}
