import { Component } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { CardsService } from "../../shared/services/cards.service";
import { Card } from "../../shared/interfaces";
import { Subject, Subscription, switchMap, takeUntil } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { getAuth } from "@angular/fire/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  cards?: Card[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  id$!: Subscription;
  nameChangeForm!: FormGroup;
  passwordChangeFrom!: FormGroup;
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(
    public authService: AuthService,
    private cardService: CardsService
  ) {
    this.id$ = toObservable(this.authService.currentUserSig).pipe(
      switchMap(() => this.cardService.getById(this.authService.id)),
      takeUntil(this.destroy$)
    ).subscribe((cards) => {
      this.cards = Object.values(cards);
    })
    this.nameChangeForm = new FormGroup({
      name: new FormControl(this.authService.userName, [Validators.required, Validators.maxLength(20)])
    })
    this.passwordChangeFrom = new FormGroup({
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
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
