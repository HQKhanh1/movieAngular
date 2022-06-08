import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MovieCastService} from '../../../../service/movie-cast.service';
import {MovieCast} from '../../../../model/MovieCast';
import {MatListOption, MatSelectionList} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-list-cast-movie',
  templateUrl: './list-cast-movie.component.html',
  styleUrls: ['./list-cast-movie.component.css']
})
export class ListCastMovieComponent implements OnInit {
  @ViewChild(MatSelectionList, {static: true})
  private selectionList: MatSelectionList;
  searchText = '';
  movieCast = new FormControl();
  castList: MovieCast[] = [];
  castSearch: MovieCast[] = [];
  castChooses: number[] = [];

  constructor(private movieCastService: MovieCastService) {
  }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.movieCastService.getCast().subscribe((data: any) => {
      if (data) {
        this.castList = data;
        this.castSearch = this.castList;
      }
    });
  }

  onNoClick() {
  }

  sendListCast() {
  }


  bindingData(id: number) {
    this.castChooses.push(id);
    let index;
    let castTemp: MovieCast;
    for (let i = 0; i < this.castList.length; i++) {
      if (this.castList[i].id === id) {
        index = i;
        console.log(index);
        break;
      }
    }
    for (let j = index; j < this.castList.length - 1; j++) {
      castTemp = this.castList[j + 1];
      this.castList[j + 1] = this.castList[j];
      this.castList[j] = castTemp;
    }
    this.castList.pop();
  }
}
