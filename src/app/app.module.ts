import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayPageComponent } from './play-page/play-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { CardComponent } from './shared/components/card/card.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TestComponent } from './play-page/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PlayPageComponent,
    ResultPageComponent,
    CardComponent,
    ErrorPageComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
