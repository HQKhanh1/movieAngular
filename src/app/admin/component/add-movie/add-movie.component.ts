import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MovieService} from '../../../../service/movie.service';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {MovieGenre} from '../../../../model/MovieGenre';
import {MovieGenreService} from '../../../../service/movie-genre.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddGenreMovieComponent} from '../add-genre-movie/add-genre-movie.component';
import {MovieCast} from '../../../../model/MovieCast';
import {MovieCastService} from '../../../../service/movie-cast.service';
import {AddCastMovieComponent} from '../add-cast-movie/add-cast-movie.component';
import {MY_DATE_FORMATS} from '../../../../util/FOMAT_DATE';
import {MovieDirector} from '../../../../model/MovieDirector';
import {AddDirectorMovieComponent} from '../add-director-movie/add-director-movie.component';
import {MovieDirectorService} from '../../../../service/movie-director.service';
import {Movie} from '../../../../model/movie';
import {FKGenre} from '../../../../model/FKGenre';
import {FKCast} from '../../../../model/FKCast';
import {FKDirector} from '../../../../model/FKDirector';
import {ImageModel} from '../../../../model/ImageModel';
import {UTIL} from '../../../../util/util';
import {ListCastMovieComponent} from '../list-cast-movie/list-cast-movie.component';


@Component({
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class AddMovieComponent implements OnInit {
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  submitted = false;
  maxDate: Date;
  hours = 0;
  minutes = 0;
  second = 0;
  movieGenre = new FormControl();
  movieCast = new FormControl();
  movieDirector = new FormControl();
  genreList: MovieGenre[] = [];
  castList: MovieCast[] = [];
  genreListSelected: number[] = [];
  directorList: MovieDirector[] = [];
  movieAdd: Movie;
  movieList: Movie[] = [];
  fkCast: FKCast[] = [];
  fkGenre: FKGenre[] = [];
  fkDirector: FKDirector[] = [];
  private movieGetByTitle: Movie;
  fileToUpload: File;
  movieImage: ImageModel = new ImageModel(UTIL.DEFAUT_MOVIE_POSTER_NAME, UTIL.DEFAULT_MOVIE_POSTER_URL);

  constructor(public movieService: MovieService,
              private movieGenreService: MovieGenreService,
              private movieCastService: MovieCastService,
              private movieDirectorService: MovieDirectorService,
              public dialogRef: MatDialogRef<AddMovieComponent>,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.movieService.initializeFormGroup();
    this.movieGenreService.getGenre().subscribe((data: any) => {
      if (data) {
        this.genreList = data;
      }
    });
    this.movieDirectorService.getDirector().subscribe((data: any) => {
      if (data) {
        this.directorList = data;
      }
    });
  }

  eventChangeSecond(target: number) {
    if (target === null) {
      this.second = 0;
    }
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
    if (target === null) {
      this.minutes = 0;
    }
    if (target >= 60) {
      const modHour = Math.floor(target / 60);
      this.minutes = target - modHour * 60;
      this.hours = this.hours + modHour;
    }
  }

  eventChangeHours(target: number) {
    if (target === null) {
      this.hours = 0;
    }
  }

  removeGenre(id: any) {
    const index = this.movieGenre.value as number[];
    this.removeFirst(index, id);
    this.movieGenre.setValue(index); // To trigger change detection
  }

  removeCast(id: any) {
    const index = this.movieCast.value as number[];
    this.removeFirst(index, id);
    this.movieCast.setValue(index); // To trigger change detection
  }

  removeDirector(id: any) {
    const index = this.movieDirector.value as number[];
    this.removeFirst(index, id);
    this.movieDirector.setValue(index); // To trigger change detection
  }

  removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onCreateGenre() {
    const dialogRef = this.matDialog.open(AddGenreMovieComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.genreList = result;
      }
    });
  }

  onCreateCast() {
    const dialogRef = this.matDialog.open(AddCastMovieComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.castList = result;
      }
    });
  }

  onCreateDirector() {
    const dialogRef = this.matDialog.open(AddDirectorMovieComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.directorList = result;
      }
    });
  }

  async saveMovie() {
    this.submitted = true;
    if (this.movieService.formMovie.invalid && !this.checkDuration()) {
      this.movieService.formMovie.value.movieDuration =
        this.hours.toString() + ':' + this.minutes.toString() + ':' + this.second.toString();
      this.movieAdd = new Movie(
        null,
        this.movieService.formMovie.value.title,
        this.movieService.formMovie.value.poster,
        this.movieService.formMovie.value.details,
        this.movieService.formMovie.value.movieStatus,
        this.movieService.formMovie.value.linkTrailer,
        this.movieService.formMovie.value.linkMovie,
        this.movieService.formMovie.value.releaseDate,
        this.movieService.formMovie.value.movieDuration,
        0,
        null,
        null,
        null,
        null);
      console.log(this.movieAdd);
      await this.movieService.addMovie(this.movieAdd).toPromise().then((value: any) => {
        console.log('Kkkkk: ', value);
      });
      await this.movieService.getMovieByTitle(this.movieAdd.title).toPromise().then((value: any) => {

        this.movieGetByTitle = value;
        console.log('Title: ', this.movieGetByTitle);
        // add genre
        if (this.movieGenre.value.length === 0) {
          this.fkGenre = null;
        } else {
          for (const id of this.movieGenre.value) {
            this.fkGenre.push(new FKGenre(value.id, id));
          }
          this.movieGetByTitle.fkGenres = this.fkGenre;
          console.log('them được genre');
        }
        // add cast
        if (this.movieCast.value.length === 0) {
          this.fkCast = null;
        } else {
          for (const id of this.movieCast.value) {
            this.fkCast.push(new FKCast(value.id, id));
          }
          this.movieGetByTitle.fkCasts = this.fkCast;
        }
        // add director
        if (this.movieDirector.value.length === 0) {
          this.fkDirector = null;
        } else {
          for (const id of this.movieDirector.value) {
            this.fkDirector.push(new FKDirector(value.id, id));
          }
          this.movieGetByTitle.fkDirectors = this.fkDirector;
        }
        console.log('pppppppppppp:', this.movieGetByTitle);
        this.movieService.editMovie(this.movieGetByTitle).subscribe((data: any) => {
          console.log('uuuuuuuuuuuuuuuuuuuuu', data);
        });
      });
      // this.getMovie(this.movieAdd.title);
      // console.log('IDIDIDIDIDID: ', idMovie);
    }
  }

  addGenresToMovie() {
  }

  getMovie(title: string) {
    this.movieService.getMovieByTitle(title).subscribe((data: Movie) => {
      if (data) {
        console.log(data);
        this.movieGetByTitle = data;
        return data;
      }
    });
  }

  checkDuration(): boolean {
    return (this.hours === 0 && this.minutes === 0 && this.second === 0) ||
      (this.hours === null && this.minutes === null && this.second === null);
  }

  genreId(id: number): MovieGenre {
    for (const genre of this.genreList) {
      if (genre.id === id) {
        return genre;
      }
    }
  }

  castId(id: number): MovieCast {
    for (const cast of this.castList) {
      if (cast.id === id) {
        return cast;
      }
    }
  }

  directorId(id: number): MovieDirector {
    for (const director of this.directorList) {
      if (director.id === id) {
        return director;
      }
    }
  }

  onNoClick() {
    this.movieService.getMovie().subscribe(((data: any) => {
      this.movieList = data;
      console.log(this.movieList);
      this.dialogRef.close(this.movieList);
    }));
  }

  handleFileUpload(files: any) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.movieImage = new ImageModel(this.fileToUpload.name, event.target.result);
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  show() {
    console.log(this.movieCast.value);
  }

  openCastList() {
    const dialogRef = this.matDialog.open(ListCastMovieComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.directorList = result;
      }
    });
  }
}
