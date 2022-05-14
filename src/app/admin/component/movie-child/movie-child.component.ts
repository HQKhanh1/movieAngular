import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../model/movie';

@Component({
  selector: 'app-movie-child',
  templateUrl: './movie-child.component.html',
  styleUrls: ['./movie-child.component.css']
})
export class MovieChildComponent implements OnInit {
  @Input() movie: Movie;
  constructor() { }

  ngOnInit() {
  }

}
