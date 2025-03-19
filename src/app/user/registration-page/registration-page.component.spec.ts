import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrationPageComponent } from './registration-page.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let authServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({ name: '', email: '', password: '' });
  });

  it('should disable the form and call register on submit', fakeAsync(() => {
    component.form.setValue({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    authServiceMock.register.and.returnValue(of({}));

    component.submit();
    tick();
    fixture.detectChanges();

    expect(authServiceMock.register).toHaveBeenCalledWith('test@example.com', 'Test User', 'password123');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
    expect(localStorage.getItem('fb-token')).toBe('true');
    expect(component.disabled).toBeTrue();
  }));

  it('should show an error message if registration fails', fakeAsync(() => {
    component.form.setValue({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    authServiceMock.register.and.returnValue(throwError(() => new Error('Email taken')));

    component.submit();
    tick();
    fixture.detectChanges();

    expect(component.error).toBe('This email is already taken.');
    expect(component.disabled).toBeFalse();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  }));
});
