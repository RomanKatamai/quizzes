import {Component, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})

export class RegistrationPageComponent implements OnDestroy {
  form!: FormGroup;
  disabled = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.disabled = true
    const rawForm = this.form.getRawValue()
    this.auth.register(rawForm.email, rawForm.name, rawForm.password).pipe(takeUntil(this.destroy$)).subscribe( {
      next: (data) => {
        this.router.navigateByUrl('/home');
        console.log()
        localStorage.setItem('fb-token', String(true));
      },
      error: () => this.disabled = false
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
