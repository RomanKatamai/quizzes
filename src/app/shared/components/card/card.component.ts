import { Component, Input } from '@angular/core';
import { Test } from "../../interfaces";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() test!: Test

  constructor() {}

  startQuiz() {
    localStorage.setItem('test', JSON.stringify(this.test));
  }
}
