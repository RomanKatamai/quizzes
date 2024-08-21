import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, startWith, Subject, switchMap, take, takeUntil, tap } from 'rxjs';

import { QuizzesService } from '../shared/quizzes.service';
import { Category, Test } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, OnDestroy {
  mapCategory!: Category[];
  idCategoryMax!: number;
  idCategoryMin!: number;
  randomCategory!: number;
  mapTests: Test[] = [];
  quantity!: number;
  title!: string;
  disabled = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private quizzesService: QuizzesService) {};

  ngOnInit() {
    this.quizzesService.getCategories()
      .pipe(
        takeUntil(this.destroy$),
        tap(quiz => {
          this.mapCategory = quiz.trivia_categories;
          this.idCategoryMax = Math.max(...this.mapCategory.map(el => el.id));
          this.idCategoryMin = Math.min(...this.mapCategory.map(el => el.id));
        }),
        switchMap(() => interval(5500)
          .pipe(
            takeUntil(this.destroy$),
            startWith(0),
            take(10),
            switchMap(() => {
              this.randomCategory = Math.floor(Math.random() *
                (this.idCategoryMax - this.idCategoryMin) + this.idCategoryMin);

              this.quantity = Math.floor(Math.random() * (50 - 10) + 10);
              return this.quizzesService.getTests(this.randomCategory, this.quantity);
            })
          )
        )
      )
      .subscribe((test: Test) => {
        test.quantity = this.quantity;
        test.title = this.mapCategory.filter(el => el.id === this.randomCategory)
          .map(el => el.name).join();
        this.mapTests.push(test);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  randomQuiz() {
    localStorage.setItem('test', JSON.stringify(this.mapTests[
      Math.floor(Math.random() * (this.mapTests.length))
      ])
    );
  }
}
