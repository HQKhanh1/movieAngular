import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../util/MyErrorStateMatcher';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MY_DATE_FORMATS} from '../../../../util/FOMAT_DATE';
import {MovieCast} from '../../../../model/MovieCast';
import {MovieCastService} from '../../../../service/movie-cast.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-cast-movie',
  templateUrl: './add-cast-movie.component.html',
  styleUrls: ['./add-cast-movie.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class AddCastMovieComponent implements OnInit {
  castForm: FormGroup;
  maxDate: Date;
  matcher = new MyErrorStateMatcher();
  cast: MovieCast;
  castList: MovieCast[] = [];

  constructor(private castService: MovieCastService,
              public dialogRef: MatDialogRef<AddCastMovieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MovieCast[]) {
  }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.castForm = new FormGroup({
      avatar: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      story: new FormControl('')
    });
  }

  saveCast() {
    if (this.castForm.valid) {
      this.cast = new MovieCast(
        null,
        this.castForm.value.avatar,
        this.castForm.value.name,
        this.castForm.value.story,
        this.castForm.value.birthday);
      this.castService.addCast(this.cast).subscribe((data) => {
          console.log(data);
        },
        (error => {
          if (error.statusText === 'OK') {
            console.log(error);
            alert('Create genre successfully');
          }
        }));
    }
  }

  onNoClick() {
    this.castService.getCast().subscribe(((data: any) => {
      this.castList = data;
      console.log(this.castList);
      this.dialogRef.close(this.castList);
    }));
  }
}
