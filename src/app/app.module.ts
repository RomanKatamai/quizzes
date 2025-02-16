import {importProvidersFrom, NgModule} from '@angular/core';
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
import { UnescapePipe } from './shared/pipes/unescape.pipe';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { RegistrationPageComponent } from './user/registration-page/registration-page.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat";
import { environmentFireBase } from "../environments/environment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { UserPageComponent } from './user/user-page/user-page.component';
import { ResultCardComponent } from './user/result-card/result-card.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PlayPageComponent,
    ResultPageComponent,
    CardComponent,
    ErrorPageComponent,
    TestComponent,
    UnescapePipe,
    LoginPageComponent,
    RegistrationPageComponent,
    UserPageComponent,
    ResultCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environmentFireBase.firebase),
  ],
  providers: [
    UnescapePipe,
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environmentFireBase.firebase)),
      provideAuth(() => getAuth())
    ])
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
