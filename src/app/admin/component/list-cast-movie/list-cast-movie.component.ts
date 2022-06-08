import {Component, OnInit, ViewChild} from '@angular/core';
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
  castChooses: MovieCast[] = [];
  sendCast = false;

  constructor(private movieCastService: MovieCastService) {
  }

  ngOnInit() {
    this.getCastList();
  }

  onNoClick() {
  }

  sendListCast() {
  }


  bindingData(cast: MovieCast) {
    this.castChooses.push(cast);
    let index;
    let castTemp: MovieCast;
    for (let i = 0; i < this.castList.length; i++) {
      if (this.castList[i].id === cast.id) {
        index = i;
        break;
      }
    }
    for (let j = index; j < this.castList.length - 1; j++) {
      castTemp = this.castList[j + 1];
      this.castList[j + 1] = this.castList[j];
      this.castList[j] = castTemp;
    }
    this.castList.pop();
    this.searchText = '';
  }

  removeCastChoosed(cast: MovieCast) {
    this.castList.push(cast);
    let index;
    let castTemp: MovieCast;
    for (let i = 0; i < this.castChooses.length; i++) {
      if (this.castChooses[i].id === cast.id) {
        index = i;
        break;
      }
    }
    for (let j = index; j < this.castChooses.length - 1; j++) {
      castTemp = this.castChooses[j + 1];
      this.castChooses[j + 1] = this.castChooses[j];
      this.castChooses[j] = castTemp;
    }
    this.castChooses.pop();
  }

  async getCastList() {
    await this.movieCastService.getCast().toPromise().then((data: any) => {
      if (data) {
        this.castList = data;
      }
    });
  }
}
