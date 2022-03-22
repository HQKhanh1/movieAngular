import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movie-child',
  templateUrl: './movie-child.component.html',
  styleUrls: ['./movie-child.component.css']
})
export class MovieChildComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit() {
  }

}
