import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Test, TriviaCategories } from './interfaces';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class QuizzesService {
  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<TriviaCategories> {
    return this.http.get<TriviaCategories>(`${environment.DBUrl}_category.php`)
  };

  getTests(id: number, quantity: number): Observable<Test>{
    return this.http.get<Test>(`${environment.DBUrl}.php?amount=${quantity}&category=${id}`)
  };
}
