import { Component, OnInit } from '@angular/core';
import { QuizzesService } from "../shared/quizzes.service";
import { Category, Test } from "../shared/interfaces";
import { interval, switchMap, take } from "rxjs";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  mapCategory!: Category[];
  idCategoryMax!: number
  idCategoryMin!: number
  randomCategory!: number
  mapTests: Test[] = []
  quantity!: number
  title!: string
  constructor(private quizzesService: QuizzesService) {};

  ngOnInit() {
    this.quizzesService.getCategories()
      .subscribe(quiz => {
        this.mapCategory = quiz.trivia_categories
        this.idCategoryMax = Math.max(...this.mapCategory.map(el => el.id))
        this.idCategoryMin = Math.min(...this.mapCategory.map(el => el.id))
      });

    interval(5000)
      .pipe(
        take(10),
        switchMap(() => {
          this.randomCategory = Math.floor(Math.random() *
            (this.idCategoryMax - this.idCategoryMin) + this.idCategoryMin);

          this.quantity = Math.floor(Math.random() * (50 - 10) + 10);
          return this.quizzesService.getTests(this.randomCategory, this.quantity);
        })
      )
      .subscribe((test: Test) => {
        test.quantity = this.quantity

        test.title = this.mapCategory.filter(el => el.id === this.randomCategory).map(el => el.name).join()

        this.mapTests.push(test);
          console.log(test)
          console.log(this.mapCategory)
      });
  }
}
