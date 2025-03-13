import { Injectable, signal } from "@angular/core";
import { from, mergeMap, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, updatePassword,
  updateProfile,
  user
} from "@angular/fire/auth";
import { UserInterface } from "../interfaces";
import { User } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  error!: string;

  public getCurrentUser() {
    this.user$.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this.currentUserSig.set({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          username: firebaseUser.displayName || '',
        });

      } else {
        this.currentUserSig.set(null);
      }
    });
  }

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
      .then(() => {
      this.currentUserSig.update((value) => ({
        ...value,
        username: name,
      }));
    })
    return from(promise)
  }

  logout(): Observable<void>{
    localStorage.removeItem('fb-token');
    const promise = signOut(this.firebaseAuth);
    return from(promise)
  }

  updatePassword(user: User, newPassword: string) {
    from(updatePassword(user, newPassword)).pipe(
      mergeMap(() => this.login(user.email as string, newPassword))
    )
  }

  updateName(user: User, name: string) {
    updateProfile(user, {displayName: name}).then(() => {
      this.currentUserSig.update((value) => ({
        ...value,
        username: name,
      }));
    })
  }
}
