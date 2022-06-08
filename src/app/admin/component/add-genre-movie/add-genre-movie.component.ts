import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../util/MyErrorStateMatcher';
import {MovieGenreService} from '../../../../service/movie-genre.service';
import {MovieGenre} from '../../../../model/MovieGenre';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UtilClass} from 'src/util/utilClass';
import {UTIL} from 'src/util/util';

@Component({
  selector: 'app-add-genre-movie',
  templateUrl: './add-genre-movie.component.html',
  styleUrls: ['./add-genre-movie.component.css']
})
export class AddGenreMovieComponent implements OnInit {
  genreList: MovieGenre[] = [];
  genreForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  genre: MovieGenre;
  checkAdd = false;

  constructor(private movieGenre: MovieGenreService,
              private movieGenreService: MovieGenreService,
              public dialogRef: MatDialogRef<AddGenreMovieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MovieGenre[]) {
  }

  ngOnInit() {
    this.genreForm = new FormGroup({
      genreName: new FormControl('', [Validators.required])
    });
    this.genreList = this.data;
  }

  async saveGene() {
    if (this.genreForm.valid) {
      this.genre = new MovieGenre(null, this.genreForm.value.genreName);
      this.movieGenre.addGenre(this.genre).subscribe((data: any) => {
          if (data.statusCode === undefined) {
            UtilClass.showMesageAlert(UTIL.ICON_SUCCESS, UTIL.ALERT_MESAGE_SUCCESS_ADD_GENRE);
          } else {
            UtilClass.showMesageAlert(UTIL.ICON_ERROR, data.message);
          }
        },
        (error => {
          UtilClass.showMesageAlert(UTIL.ICON_ERROR, error.message);
        }));
    }
  }

  onNoClick() {
    this.movieGenreService.getGenre().subscribe((data: any) => {
      this.genreList = data;
      console.log(this.genreList);
      this.dialogRef.close(this.genreList);
    });
  }
}
