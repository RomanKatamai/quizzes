import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Card, FBCreateResponse } from "../interfaces";
import { environmentFireBase } from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class CardsService {
  constructor(private http: HttpClient) {};

  create(card: Card): Observable<Card> {
    return this.http.post<FBCreateResponse>(`${environmentFireBase.FbDBUrl}/cards.json`, card)
      .pipe(map((response: FBCreateResponse) => {
        return card;
      }));
  };

  getById(id: string | undefined): Observable<Card[]> {
    return this.http.get<Card[]>(`${environmentFireBase.FbDBUrl}/cards.json?orderBy=%22id%22&equalTo=%22${id}%22`)
  };
}
