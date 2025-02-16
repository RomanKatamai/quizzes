import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {CardsService} from "../../shared/services/cards.service";
import {Card, UserInterface} from "../../shared/interfaces";
import {Observable, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  cards?: Card[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  id$!: Subscription;

  constructor(
    public auth: AuthService,
    private cardService: CardsService
  ) {

    this.id$ = toObservable(this.auth.currentUserSig).pipe(
      switchMap(() => this.cardService.getById(this.auth.id)),
      takeUntil(this.destroy$)
    ).subscribe((cards) => {
       this.cards = Object.values(cards);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
