import { Component } from '@angular/core';


@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})

export class ResultPageComponent {
  points!: number;
  quantity!: number;
  time!: string;
  percent!: number;

  constructor() {
    this.quantity = JSON.parse(localStorage.getItem('test') as string).quantity;
    this.points = parseInt(localStorage.getItem('points') as string);
    this.time = localStorage.getItem('time-spent') as string;
    this.percent = Math.round((this.points / this.quantity) * 100);
  }

  clearData() {
    localStorage.clear();
  }
}
