import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Auth, getAuth, onAuthStateChanged, User } from "@angular/fire/auth";
import { Subject, Subscription, switchMap, takeUntil } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

import { AuthService } from "../../shared/services/auth.service";
import { CardsService } from "../../shared/services/cards.service";
import { Card } from "../../shared/interfaces";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {
  cards?: Card[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  idSub!: Subscription;
  nameSub!: Subscription;
  nameChangeForm!: FormGroup;
  passwordChangeFrom!: FormGroup;
  auth!: Auth;
  user!: User | null;

  constructor(
    private authService: AuthService,
    private cardService: CardsService
  ) {
    this.idSub = toObservable(this.authService.currentUserSig).pipe(
      switchMap(() => this.cardService.getById(this.authService.currentUserSig()?.id)),
      takeUntil(this.destroy$)
    ).subscribe((cards) => {
      this.cards = Object.values(cards);
    })

    this.nameChangeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)])
    })

    this.passwordChangeFrom = new FormGroup({
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })

    this.nameSub = toObservable(this.authService.currentUserSig).pipe(
      takeUntil(this.destroy$)
    ).subscribe((name) => {
      if(name) {
        this.nameChangeForm.reset({ name: name.username })
      }
    })
  }

  ngOnInit() {
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  UpdateName() {
    const rawForm = this.nameChangeForm.getRawValue();
    this.authService.updateName(this.user as User,rawForm.name);
  }

  UpdatePassword() {
    const rawForm = this.passwordChangeFrom.getRawValue();
    if(rawForm.password.length > 0) {
      this.authService.updatePassword(this.user as User,rawForm.password);
      this.passwordChangeFrom.reset();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
