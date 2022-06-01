import {Component, Input, OnInit} from '@angular/core';
import {MovieCast} from "../../../../model/MovieCast";

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  @Input() cast: MovieCast;
  date: string;

  constructor() { }

  ngOnInit() {
    this.date = this.cast.birthday[2] + '/' + this.cast.birthday[1] + '/' + this.cast.birthday[0];
  }

}
