import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Movie} from '../../../../model/movie';
import {MovieService} from '../../../../service/movie.service';
import {ImageModel} from '../../../../model/ImageModel';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {UTIL} from '../../../../util/util';
import {UtilClass} from '../../../../util/utilClass';

@Component({
  selector: 'app-movie-child',
  templateUrl: './movie-child.component.html',
  styleUrls: ['./movie-child.component.css']
})
export class MovieChildComponent implements OnInit {
  @Input() movie: Movie;
  @Output() deleteMovieEvent = new EventEmitter<Movie>();
  posterModel: ImageModel = new ImageModel(UTIL.DEFAUT_MOVIE_POSTER_NAME, UTIL.DEFAULT_MOVIE_POSTER_URL);

  constructor(private movieService: MovieService, private loginService: LoginAdminService) {
  }

  ngOnInit() {
    this.getPoster().then(value => {});
  }
  async getPoster() {
    await this.loginService.getAccImage(this.movie.poster).toPromise().then((result: any) => {
      this.posterModel = result;
    });
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe((data: any) => {
      if (data) {
        this.deleteMovieEvent.emit(this.movie);
        UtilClass.showMesageAlert(UTIL.ICON_SUCCESS, UTIL.ALERT_MESAGE_SUCCESS_REMOVE_MOVIE);
      }
    });
  }
}
