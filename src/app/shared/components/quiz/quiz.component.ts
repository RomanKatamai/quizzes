import {Component, Input} from '@angular/core';
import {Test} from "../../interfaces";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  @Input() test!: Test

  constructor() {
  }
  startQuiz() {

  }
}
