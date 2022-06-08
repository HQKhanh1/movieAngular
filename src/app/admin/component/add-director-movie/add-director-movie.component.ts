import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../util/MyErrorStateMatcher';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MY_DATE_FORMATS} from '../../../../util/FOMAT_DATE';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MovieCast} from '../../../../model/MovieCast';
import {MovieDirectorService} from '../../../../service/movie-director.service';
import {MovieDirector} from '../../../../model/MovieDirector';
import {UtilClass} from "../../../../util/utilClass";
import {UTIL} from "../../../../util/util";

@Component({
  selector: 'app-add-director-movie',
  templateUrl: './add-director-movie.component.html',
  styleUrls: ['./add-director-movie.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class AddDirectorMovieComponent implements OnInit {
  directorForm = new FormGroup({});
  matcher = new MyErrorStateMatcher();
  maxDate: Date;
  director: MovieDirector;
  directorList: MovieDirector[] = [];

  constructor(private directorService: MovieDirectorService,
              public dialogRef: MatDialogRef<AddDirectorMovieComponent>) {
  }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.directorForm = new FormGroup({
      avatar: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      story: new FormControl('')
    });
  }

  saveDirector() {
    if (this.directorForm.valid) {
      this.director = new MovieDirector(
        null,
        this.directorForm.value.avatar,
        this.directorForm.value.name,
        this.directorForm.value.story,
        this.directorForm.value.birthday);
      this.directorService.addDirector(this.director).subscribe((data: any) => {
          console.log(data);
          if (data.statusCode === undefined) {
            UtilClass.showMesageAlert(UTIL.ICON_SUCCESS, UTIL.ALERT_MESAGE_SUCCESS_ADD_DIRECTOR);
          } else {
            UtilClass.showMesageAlert(UTIL.ICON_ERROR, data.message);
          }
        },
        (error => {
          if (error.statusText === 'OK') {
            console.log(error);
          }
        }));
    }
  }

  onNoClick() {
    this.directorService.getDirector().subscribe(((data: any) => {
      this.directorList = data;
      console.log(this.directorList);
      this.dialogRef.close(this.directorList);
    }));
  }
}
