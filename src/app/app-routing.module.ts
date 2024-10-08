import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { playPageGuard } from './shared/guards/play-page.guard';
import { finishPageGuard } from './shared/guards/finish-page.guard';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: 'home', component: HomePageComponent},
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
