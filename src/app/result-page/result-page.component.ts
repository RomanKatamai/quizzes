import { Component } from '@angular/core';
import { Card } from "../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";
import { CardsService } from "../shared/services/cards.service";



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
  id!: string | undefined;

  constructor(
    private auth: AuthService,
    private cardsService: CardsService
  ) {
    this.quantity = JSON.parse(localStorage.getItem('test') as string).quantity;
    this.points = parseInt(localStorage.getItem('points') as string);
    this.time = localStorage.getItem('time-spent') as string;
    this.percent = Math.round((this.points / this.quantity) * 100);
    this.id = this.auth.currentUserSig()?.id
  }

  createCard() {
    const card: Card = {
      time: this.time,
      percent: this.percent,
      date: new Date(),
      correct_answer: this.points,
      title: JSON.parse(localStorage.getItem('test') as string).title,
      id: this.auth.id,
      quantity: this.quantity
    }

    this.cardsService.create(card).subscribe();
  }

  clearData() {
    if(localStorage.getItem('fb-token')){
      this.createCard();
    }

      localStorage.removeItem('test');
      localStorage.removeItem('points');
      localStorage.removeItem('time-spent');
  }

}
