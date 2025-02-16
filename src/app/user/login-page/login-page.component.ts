import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  form!: FormGroup;
  disabled = false;
  error: string | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit() {
    this.disabled = true;
    const rawForm = this.form.getRawValue();
    this.auth.login(rawForm.email, rawForm.password).pipe(takeUntil(this.destroy$)).subscribe( {
      next: () => {
        this.router.navigateByUrl('/home');
        localStorage.setItem('fb-token', String(true));
      },
      error: () => {
        this.disabled = false;
        this.form.reset();
        this.error = "Invalid email or password, please try again";
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
