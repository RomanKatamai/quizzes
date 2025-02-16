import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { playPageGuard } from './shared/guards/play-page.guard';
import { finishPageGuard } from './shared/guards/finish-page.guard';
import { authGuard } from "./shared/guards/auth.guard";
import { LoginPageComponent } from "./user/login-page/login-page.component";
import { RegistrationPageComponent } from "./user/registration-page/registration-page.component";
import { UserPageComponent } from "./user/user-page/user-page.component";
import { userGuard } from "./shared/guards/user.guard";

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: 'home', component: HomePageComponent},
      {path: 'login', component: LoginPageComponent, canActivate: [authGuard]},
      {path: 'register', component: RegistrationPageComponent, canActivate: [authGuard]},
      {path: 'user-page', component: UserPageComponent, canActivate: [userGuard]},
      {path: 'play', component: PlayPageComponent, canActivate: [playPageGuard]},
      {path: 'finish', component: ResultPageComponent, canActivate: [finishPageGuard]},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', component: ErrorPageComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
