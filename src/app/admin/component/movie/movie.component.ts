import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  text = '111';
  constructor() { }

  ngOnInit() {
  }

}
