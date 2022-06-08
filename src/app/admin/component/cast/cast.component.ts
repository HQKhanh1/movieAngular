import {Component, Input, OnInit} from '@angular/core';
import {MovieCast} from '../../../../model/MovieCast';
import {ImageModel} from '../../../../model/ImageModel';
import {UTIL} from '../../../../util/util';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {MovieCastService} from '../../../../service/movie-cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  @Input() cast: number;
  castInHere: MovieCast = null;
  date: string;
  imageCast: ImageModel = new ImageModel(UTIL.DEFAUT_MOVIE_POSTER_NAME, UTIL.DEFAULT_ACCOUNT_IMAGE_URL_MALE);

  constructor(private loginService: LoginAdminService,
              private castService: MovieCastService) {
  }

  ngOnInit() {
    // this.date = this.cast.birthday[2] + '/' + this.cast.birthday[1] + '/' + this.cast.birthday[0];
    this.getCast().then(() => {
      this.getAvatar().then(() => {
      });
    });
  }

  async getCast() {
    await this.castService.getCastById(this.cast).toPromise().then((data: any) => {
      if (data.statusCode === undefined) {
        this.castInHere = data;
      }
    });
  }

  async getAvatar() {
    await this.loginService.getAccImage(this.castInHere.avatar).toPromise().then((result: any) => {
      this.imageCast = result;
    });
  }
}
