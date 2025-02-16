import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent implements OnInit, DoCheck, OnDestroy {
  username!: string | undefined;
  authorized!: string | null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe(user=> {
      if(user) {
        this.auth.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        })
      } else {
        this.auth.currentUserSig.set(null)
      }
      this.username = this.auth.userName;
    });
  }

  ngDoCheck() {
    this.authorized = localStorage.getItem('fb-token');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  Logout() {
    this.auth.logout();
    this.router.navigate(['home']);
  }

  goHome() {
    localStorage.removeItem('test');
    localStorage.removeItem('points');
    localStorage.removeItem('time-spent');
  }

}
