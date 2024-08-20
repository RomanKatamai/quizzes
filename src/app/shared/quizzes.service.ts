import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Test, TriviaCategories} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<TriviaCategories> {
    return this.http.get<TriviaCategories>('https://opentdb.com/api_category.php')
  };

  getTests(id: number, quantity: number): Observable<Test>{
    return this.http.get<Test>(`https://opentdb.com/api.php?amount=${quantity}&category=${id}`)
  };
}
