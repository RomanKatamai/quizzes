import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./shared/components/main-layout/main-layout.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { PlayPageComponent } from "./play-page/play-page.component";
import { ResultPageComponent } from "./result-page/result-page.component";


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: "full"},
    {path: '', component: HomePageComponent},
    {path: 'play', component: PlayPageComponent},
    {path: 'finish', component: ResultPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
