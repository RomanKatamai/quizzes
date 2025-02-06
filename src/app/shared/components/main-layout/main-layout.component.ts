import {Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent implements OnInit, DoCheck {
  username!: string | undefined
  authorized!: string | null

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user=> {
      if(user) {
        this.auth.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        })
      } else {
        this.auth.currentUserSig.set(null)
      }
      this.username = this.auth.currentUserSig()?.username
    });
  }

  ngDoCheck() {
    this.authorized = localStorage.getItem('fb-token')
  }

  Logout() {
    this.auth.logout();
    this.router.navigate(['home'])
  }

  goHome() {
    localStorage.removeItem('test');
    localStorage.removeItem('points');
    localStorage.removeItem('time-spent');
  }

}
