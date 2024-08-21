import { Component } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})

export class ResultPageComponent {
  points!: string;
  quantity!: number;

  constructor() {
    this.quantity = JSON.parse(localStorage.getItem('test') as string).quantity;
    this.points = localStorage.getItem('points') as string;
  }

  clearData() {
    localStorage.clear();
  }
}
