import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUserSig: of({ username: 'Test User' })
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [MainLayoutComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update authorized in ngDoCheck', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock-token');
    component.ngDoCheck();
    expect(component.authorized).toBeTruthy();
  });

  it('should call logout and navigate to home on Logout()', () => {
    spyOn(router, 'navigate');
    component.Logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should clear localStorage in goHome()', () => {
    spyOn(localStorage, 'removeItem');
    component.goHome();
    expect(localStorage.removeItem).toHaveBeenCalledWith('test');
    expect(localStorage.removeItem).toHaveBeenCalledWith('points');
    expect(localStorage.removeItem).toHaveBeenCalledWith('time-spent');
  });
});
