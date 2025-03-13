import { Component, computed, DoCheck, OnDestroy } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent implements DoCheck, OnDestroy {
  authorized!: string | null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  name = computed(() => this.auth.currentUserSig()?.username)

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

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
