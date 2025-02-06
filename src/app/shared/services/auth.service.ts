import { Injectable, signal } from "@angular/core";
import { from, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
import { UserInterface } from "../interfaces";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface | null | undefined>(undefined)
  error!: string

  constructor(
    private auth: AngularFireAuth,
    private firebaseAuth: Auth
  ) {}

  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {})
    return from(promise)
  }

  register(
    email: string,
    name: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(response => updateProfile(response.user, {displayName: name}))
    return from(promise)
  }

  logout(): Observable<void>{
    localStorage.removeItem('fb-token');
    const promise = signOut(this.firebaseAuth);
    return from(promise)
  }
}
