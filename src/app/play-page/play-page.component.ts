import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Test } from '../shared/interfaces';

@Component({
  selector: 'app-play-page',
  templateUrl: './play-page.component.html',
  styleUrls: ['./play-page.component.scss']
})

export class PlayPageComponent implements OnInit {
  tests!: Test[];
  index: number = 0;
  points: number = 0;
  title!: string;
  quantity!: number;

  constructor(private router: Router) {}

  ngOnInit() {
    const quiz = JSON.parse(localStorage.getItem('test') as string);
    this.title = quiz.title;
    this.tests = quiz.results;
    this.quantity = quiz.quantity;
    this.randomizeAnswers();
  }

  randomizeAnswers() {
    this.tests.map(test => test.answers = [test.correct_answer, ...test.incorrect_answers]
      .sort(() => Math.random() - 0.5));
  }

  calculatePoints(answer: string) {
    if(answer == this.tests[this.index].correct_answer) {
        this.points++;
    }
    if(this.index === this.tests.length - 1) {
      this.router.navigate(['/finish']);
      localStorage.setItem('points', this.points.toString());
    } else {
      this.index++;
    }
  }

  closing() {
    localStorage.clear();
  }

}
